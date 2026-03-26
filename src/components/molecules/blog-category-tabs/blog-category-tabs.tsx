import Link from 'next/link';
import { getCategoryStats } from '@/utils/post';
import { cn } from '@/utils/shadcn';

interface BlogCategoryTabsProps {
    /** 當前選中的分類 */
    currentCategory: string;
}

/**
 * 部落格分類標籤元件。
 *
 * 用於顯示可水平滑動的分類列表，並標示當前選項。
 */
const BlogCategoryTabs = ({ currentCategory }: BlogCategoryTabsProps) => {
    // 取得所有分類
    const categories = getCategoryStats();
    // 格式化分類 (所有分類 + All)
    const formattedCategories = [
        {
            category: 'All',
            count: categories?.reduce((acc, item) => acc + item?.count, 0) || 0,
        },
        ...(categories || []),
    ];

    return (
        <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-max justify-center gap-4 px-4 pb-2">
                {formattedCategories?.map((item) => (
                    <Link
                        key={item?.category}
                        href={`/blog/${item?.category?.toLowerCase()}/1`}
                        className={cn(
                            'text-2xl font-medium transition-opacity md:text-3xl',
                            currentCategory !== item?.category?.toLowerCase() && 'opacity-20 hover:opacity-50'
                        )}
                    >
                        {item?.category}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogCategoryTabs;
