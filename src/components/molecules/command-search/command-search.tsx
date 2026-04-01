'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TagList from '@/components/atoms/tag-list';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { getPublishedPosts } from '@/utils/post';

/**
 * 搜尋對話框元件的屬性介面。
 */
interface CommandSearchProps {
    /** 對話框是否開啟。 */
    open: boolean;
    /** 對話框開啟狀態改變時的回調函數。 */
    onOpenChange: (open: boolean) => void;
}

/**
 * 搜尋對話框元件。
 *
 * 提供全站文章搜尋功能，支援標題、描述、分類、標籤和標題內容的搜尋。
 * 搜尋結果會根據分類進行分組顯示。
 *
 */
const CommandSearch = ({ open, onOpenChange }: CommandSearchProps) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    // 使用 useMemo 緩存文章數據，避免每次渲染時重新獲取
    const posts = useMemo(() => getPublishedPosts(), []);

    // 使用 useMemo 緩存搜尋結果
    const filteredPosts = useMemo(() => {
        if (!searchValue) return posts; // 預設顯示所有文章

        const searchLower = searchValue?.toLowerCase();
        return posts?.filter((post) => {
            const titleMatch = post?.title?.toLowerCase().includes(searchLower);
            const descriptionMatch = post?.description?.toLowerCase().includes(searchLower);
            const categoryMatch = post?.category?.toLowerCase().includes(searchLower);
            const tagsMatch = post?.tags?.some((tag) => tag.toLowerCase().includes(searchLower));
            const headingMatch = post?.headings?.some((heading) => heading?.text?.toLowerCase()?.includes(searchLower));

            return titleMatch || descriptionMatch || categoryMatch || tagsMatch || headingMatch;
        });
    }, [posts, searchValue]);

    // 使用 useMemo 緩存分組結果
    const groupedPosts = useMemo(() => {
        return filteredPosts?.reduce(
            (acc, post) => {
                const category = post?.category || '其他';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category]?.push(post);
                return acc;
            },
            {} as Record<string, typeof posts>
        );
    }, [filteredPosts]);

    // 使用 useCallback 優化事件處理函數
    const handleSelectPost = useCallback(
        (permalink: string) => {
            router.push(permalink);
            onOpenChange(false);
            setSearchValue('');
        },
        [router, onOpenChange]
    );

    // 重置搜尋值當對話框關閉時
    useEffect(() => {
        const reset = () => setSearchValue('');
        if (!open) {
            reset();
        }
    }, [open]);

    return (
        <CommandDialog
            open={open}
            onOpenChange={onOpenChange}
            title="搜尋文章"
            description="搜尋文章標題、描述、分類或標籤"
            className="top-1/2 -translate-y-1/2 sm:max-w-2xl md:max-w-3xl"
        >
            <Command>
                <CommandInput
                    wrapperClassName="p-2"
                    placeholder="輸入關鍵字搜尋文章..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                />
                <CommandList className="h-100">
                    <CommandEmpty>
                        <div className="flex flex-wrap items-center justify-center gap-1">
                            <span>無法找到相關結果</span>
                            &ldquo;
                            <span className="text-primary font-bold">{searchValue}</span>
                            &rdquo;
                        </div>
                    </CommandEmpty>

                    {Object?.entries(groupedPosts)?.map(([category, categoryPosts]) => (
                        <CommandGroup key={category} heading={category}>
                            {categoryPosts?.map((post) => (
                                <CommandItem
                                    key={post?.slug}
                                    value={`${post?.title} ${post?.description} ${post?.category} ${post?.tags?.join(' ')}`}
                                    onSelect={() => handleSelectPost(post?.permalink)}
                                    className="p-4 hover:cursor-pointer"
                                >
                                    <div className="flex w-full flex-col gap-1">
                                        <div className="line-clamp-1 font-medium" title={post?.title}>
                                            {post?.title}
                                        </div>
                                        <div
                                            className="line-clamp-2 text-sm/[1.75] opacity-70"
                                            title={post?.description}
                                        >
                                            {post?.description}
                                        </div>
                                        <TagList tags={post?.tags} className="mt-1" />
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </Command>
        </CommandDialog>
    );
};

export default CommandSearch;
