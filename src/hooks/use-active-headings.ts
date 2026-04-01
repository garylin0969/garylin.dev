import { useEffect, useState } from 'react';
import { HEADER_HIGHT } from '@/constants/site';
import { createHeadingId } from '@/utils/heading';

/**
 * 用於監聽滾動位置並檢測當前可見標題的 Hook。
 *
 * 使用 Intersection Observer API 來提升效能，避免頻繁的 scroll 事件監聽。
 *
 */
const useActiveHeadings = (headings: { level: number; text: string; id?: string }[]) => {
    const [activeHeadings, setActiveHeadings] = useState<string[]>([]);

    useEffect(() => {
        if (!headings?.length) return;

        // 獲取所有標題元素
        const headingElements = headings
            .map((heading) => {
                const headingId = heading?.id ?? createHeadingId(heading?.text);
                const element = document.getElementById(createHeadingId(heading?.text));
                return element ? { element, text: heading.text, id: headingId, level: heading.level } : null;
            })
            .filter(Boolean) as { element: HTMLElement; text: string; id: string; level: number }[];

        if (headingElements.length === 0) return;

        // 用於追蹤哪些標題目前可見
        const visibleHeadings = new Set<string>();

        // 找到最接近視窗頂部的標題
        const findNearestHeading = (elements: { element: HTMLElement; text: string; id: string; level: number }[]) => {
            let closestHeading = '';
            let minDistance = Infinity;

            elements.forEach(({ element, id }) => {
                const rect = element.getBoundingClientRect();
                const distance = Math.abs(rect.top - HEADER_HIGHT);

                if (rect.top <= HEADER_HIGHT && distance < minDistance) {
                    minDistance = distance;
                    closestHeading = id;
                }
            });

            if (closestHeading) {
                setActiveHeadings([closestHeading]);
            } else if (elements.length > 0) {
                // 如果都在視窗下方，選擇第一個標題
                setActiveHeadings([elements[0].id]);
            }
        };

        // 創建 Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                let hasChanges = false;

                entries.forEach((entry) => {
                    const headingText = entry.target.id;

                    if (entry.isIntersecting) {
                        if (!visibleHeadings.has(headingText)) {
                            visibleHeadings.add(headingText);
                            hasChanges = true;
                        }
                    } else {
                        if (visibleHeadings.has(headingText)) {
                            visibleHeadings.delete(headingText);
                            hasChanges = true;
                        }
                    }
                });

                // 只有在可見性有變化時才更新狀態
                if (hasChanges) {
                    if (visibleHeadings.size === 0) {
                        // 如果沒有標題可見，找到最接近的標題
                        findNearestHeading(headingElements);
                    } else {
                        // 按照文檔順序排序可見的標題
                        const sortedVisibleHeadings = headingElements
                            .filter(({ id }) => visibleHeadings.has(id))
                            .map(({ id }) => id);

                        setActiveHeadings(sortedVisibleHeadings);
                    }
                }
            },
            {
                // 設定根邊界，考慮 header 高度
                rootMargin: `-${HEADER_HIGHT}px 0px -50% 0px`,
                // 設定閾值，當標題完全進入或離開時觸發
                threshold: [0, 1],
            }
        );

        // 開始觀察所有標題元素
        headingElements.forEach(({ element }) => {
            observer.observe(element);
        });

        // 初始檢查，以防頁面已經滾動到某個位置
        const timer = setTimeout(() => {
            if (visibleHeadings.size === 0) {
                findNearestHeading(headingElements);
            }
        }, 100);

        // 清理函數
        return () => {
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [headings]);

    return activeHeadings;
};

export default useActiveHeadings;
