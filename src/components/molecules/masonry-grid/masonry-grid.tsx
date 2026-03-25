'use client';

import { Children, ReactNode, useEffect, useState } from 'react';
import useIsMounted from '@/hooks/use-is-mounted';
import { cn } from '@/utils/shadcn';

/**
 * 瀑布流網格的欄數設定介面
 */
interface MasonryGridCols {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
}

/**
 * 瀑布流網格屬性介面
 */
interface MasonryGridProps {
    /** 要排版的子元素陣列 */
    children: ReactNode;
    /** 斷點的欄數設定 (預設: SSR 期間會使用 default 欄數) */
    cols?: MasonryGridCols;
    /** 外層 flex 容器的 className */
    className?: string;
    /** 單獨一欄的 flex-col 容器 className */
    columnClassName?: string;
}

/**
 * 自訂瀑布流網格元件
 *
 * 使用 JavaScript 動態根據螢幕寬度切分陣列，解決純 CSS multiple columns
 * 排列順序由上到下的問題，強制實現由左至右遞增的完美順序。
 * 並且在 SSR 期間會根據 default 提供預設欄數以防 Hydration 錯誤。
 */
const MasonryGrid = ({
    children,
    cols = { default: 1, md: 2, lg: 3 },
    className,
    columnClassName,
}: MasonryGridProps) => {
    const isMounted = useIsMounted();
    const [columns, setColumns] = useState(cols.default);

    const colDefault = cols.default;
    const colSm = cols.sm;
    const colMd = cols.md;
    const colLg = cols.lg;
    const colXl = cols.xl;
    const col2xl = cols['2xl'];

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            if (col2xl && width >= 1536) return setColumns(col2xl);
            if (colXl && width >= 1280) return setColumns(colXl);
            if (colLg && width >= 1024) return setColumns(colLg);
            if (colMd && width >= 768) return setColumns(colMd);
            if (colSm && width >= 640) return setColumns(colSm);
            setColumns(colDefault);
        };

        // 初始執行一次
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, [col2xl, colXl, colLg, colMd, colSm, colDefault]);

    // SSR 期間回傳 default，避免 hydration mismatch
    const currentCols = isMounted ? columns : cols.default;

    // 將所有 children 轉換為乾淨的陣列
    const items = Children.toArray(children);

    // 初始化 column 陣列容器
    const columnWrappers = Array.from({ length: currentCols }, () => [] as ReactNode[]);

    // 依序發牌：1 給第一欄，2 給第二欄，3 給第三欄，4 從第一欄繼續。
    items.forEach((item, i) => {
        columnWrappers[i % currentCols].push(item);
    });

    return (
        <div className={cn('flex w-full items-start gap-4', className)}>
            {columnWrappers.map((colItems, i) => (
                <div key={`masonry-col-${i}`} className={cn('flex flex-1 flex-col gap-4', columnClassName)}>
                    {colItems.map((item, j) => (
                        <div key={`masonry-item-${i}-${j}`}>{item}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MasonryGrid;
