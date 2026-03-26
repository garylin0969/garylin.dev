import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCategoryStats } from '@/utils/post';
import { cn } from '@/utils/shadcn';

interface BlogCategoryTabsProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 當前選中的分類 */
    currentCategory: string;
}

/**
 * 部落格分類標籤元件。
 *
 * 用於顯示可水平滑動的分類列表，並標示當前選項。
 */
const BlogCategoryTabs = ({ className, currentCategory }: BlogCategoryTabsProps) => {
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
        <div className={cn('w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}>
            <Tabs value={currentCategory}>
                <TabsList variant="line">
                    {formattedCategories?.map((item) => (
                        <Link key={item?.category} href={`/blog/${item?.category?.toLowerCase()}/1`}>
                            <TabsTrigger value={item?.category?.toLowerCase() ?? ''}>{item?.category}</TabsTrigger>
                        </Link>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};

export default BlogCategoryTabs;
