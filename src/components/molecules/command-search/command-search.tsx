'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';

interface SearchPost {
    /** 文章 slug。 */
    slug: string;
    /** 文章連結。 */
    permalink: string;
    /** 文章標題。 */
    title: string;
    /** 文章描述。 */
    description: string;
    /** 文章分類。 */
    category: string;
    /** 文章標籤。 */
    tags: string[];
    /** 文章標題清單。 */
    headings: string[];
    /**
     * 建置時預先整理好的搜尋字串。
     *
     * 這樣前端在輸入時不必每次都重新把 title / description / tags / headings
     * 全部轉小寫再組字串，只需要做一次 `includes` 比對即可。
     */
    searchableText: string;
}

/**
 * 搜尋對話框元件的屬性介面。
 */
interface CommandSearchProps {
    /** 對話框是否開啟。 */
    open: boolean;
    /** 對話框開啟狀態改變時的回調函數。 */
    onOpenChange: (open: boolean) => void;
}

interface CommandSearchResultsProps {
    /** 依分類分組後的搜尋結果。 */
    groupedPosts: Record<string, SearchPost[]>;
    /** 點擊文章結果後的處理函數。 */
    onSelectPost: (permalink: string) => void;
}

interface CommandSearchResultItemProps {
    /** 單筆搜尋結果。 */
    post: SearchPost;
    /** 點擊文章結果後的處理函數。 */
    onSelectPost: (permalink: string) => void;
}

/**
 * 搜尋載入狀態。
 *
 * 第一次打開搜尋視窗時會去抓靜態索引，
 * 抓取完成前先顯示 Skeleton，避免畫面先閃出「找不到結果」。
 */
const CommandSearchLoadingState = () => {
    return (
        <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-18 w-full" />
            <Skeleton className="h-18 w-full" />
            <Skeleton className="h-18 w-full" />
        </div>
    );
};

/**
 * 搜尋無結果狀態。
 *
 * 只有在索引已載入完成後，才顯示真正的「找不到結果」提示。
 */
const CommandSearchEmptyState = ({ searchValue, hasLoaded }: { searchValue: string; hasLoaded: boolean }) => {
    return (
        <CommandEmpty>
            {hasLoaded && (
                <div className="flex flex-wrap items-center justify-center gap-1">
                    <span>無法找到相關結果</span>
                    &ldquo;
                    <span className="text-primary font-bold">{searchValue}</span>
                    &rdquo;
                </div>
            )}
        </CommandEmpty>
    );
};

/**
 * 單筆搜尋結果項目。
 *
 * 把結果列本身的 JSX 抽離後，主元件可以專注在狀態管理與資料處理。
 */
const CommandSearchResultItem = ({ post, onSelectPost }: CommandSearchResultItemProps) => {
    return (
        <CommandItem
            value={`${post?.title} ${post?.description} ${post?.category} ${post?.tags?.join(' ')}`}
            onSelect={() => onSelectPost(post?.permalink)}
            className="p-4 hover:cursor-pointer"
        >
            <div className="flex w-full flex-col gap-1">
                <div className="line-clamp-1 font-medium" title={post?.title}>
                    {post?.title}
                </div>
                <div className="line-clamp-2 text-sm/[1.75] opacity-70" title={post?.description}>
                    {post?.description}
                </div>
                <TagList tags={post?.tags} className="mt-1" />
            </div>
        </CommandItem>
    );
};

/**
 * 搜尋結果列表。
 *
 * 使用者在 command palette 中可以先縮小到某個分類，再選文章，
 * 因此結果維持分類群組呈現會比單一扁平清單更好掃描。
 */
const CommandSearchResults = ({ groupedPosts, onSelectPost }: CommandSearchResultsProps) => {
    return Object.entries(groupedPosts).map(([category, categoryPosts]) => (
        <CommandGroup key={category} heading={category}>
            {categoryPosts.map((post) => (
                <CommandSearchResultItem key={post.slug} post={post} onSelectPost={onSelectPost} />
            ))}
        </CommandGroup>
    ));
};

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
    const [posts, setPosts] = useState<SearchPost[]>([]);
    const [isLoading, setIsLoading] = useState(false); // 第一次打開搜尋視窗時會去抓靜態索引。
    const [hasLoaded, setHasLoaded] = useState(false); // 避免每次開關搜尋視窗都重抓靜態搜尋索引。
    // 延後處理使用者輸入，避免每次鍵入都立刻觸發整份清單的搜尋計算。
    const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());

    useEffect(() => {
        /**
         * 搜尋資料改成在使用者真的打開 command palette 時才抓取。
         *
         * 這樣平常瀏覽頁面時，Header 不需要先把所有文章索引塞進 client bundle。
         * `hasLoaded` 代表資料已抓過一次，後續重新開啟時直接重用記憶體中的索引，
         * 避免每次開關搜尋視窗都重抓靜態搜尋索引。
         */
        if (!open || hasLoaded) {
            return;
        }

        let active = true;
        setIsLoading(true);

        const loadPosts = async () => {
            try {
                const response = await fetch('/search-index.json');

                if (!response.ok || !active) {
                    return;
                }

                const data = (await response.json()) as SearchPost[];
                setPosts(data);
                setHasLoaded(true);
            } finally {
                if (active) {
                    setIsLoading(false);
                }
            }
        };

        void loadPosts();

        return () => {
            active = false;
        };
    }, [hasLoaded, open]);

    /**
     * 搜尋結果過濾。
     *
     * 搜尋字串與每篇文章的可搜尋內容都已先做過正規化，
     * 這裡只需要單次 `includes` 比對，避免重複小寫轉換與多欄位掃描。
     */
    const filteredPosts = useMemo(() => {
        if (!deferredSearchValue) {
            return posts;
        }

        return posts.filter((post) => post.searchableText.includes(deferredSearchValue));
    }, [deferredSearchValue, posts]);

    /**
     * 依分類分組搜尋結果。
     *
     * UI 會用分類群組呈現結果，因此這裡先整理成 map，
     * 讓渲染層只負責輸出，不需要再摻雜分組邏輯。
     */
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

    /**
     * 選取文章後導向對應頁面，並把搜尋視窗與輸入內容一起重置。
     */
    const handleSelectPost = useCallback(
        (permalink: string) => {
            router.push(permalink);
            onOpenChange(false);
            setSearchValue('');
        },
        [router, onOpenChange]
    );

    /**
     * 關閉搜尋視窗時清空輸入值。
     *
     * 這樣下次重新打開時會回到預設列表，而不是保留上一次的查詢狀態。
     */
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
                    {isLoading ? (
                        <CommandSearchLoadingState />
                    ) : (
                        <CommandSearchEmptyState searchValue={searchValue} hasLoaded={hasLoaded} />
                    )}

                    <CommandSearchResults groupedPosts={groupedPosts} onSelectPost={handleSelectPost} />
                </CommandList>
            </Command>
        </CommandDialog>
    );
};

export default CommandSearch;
