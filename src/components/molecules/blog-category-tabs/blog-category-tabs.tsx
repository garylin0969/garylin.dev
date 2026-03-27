import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllCategories } from '@/utils/post';
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
    const categories = getAllCategories();

    // 組合分類清單：All + 各分類，預先計算小寫名稱供路由與比對使用
    const tabs = [
        { label: 'All', value: 'all' },
        ...categories.map((category) => ({
            label: category,
            value: (category ?? '').toLowerCase(),
        })),
    ];

    return (
        <div className={cn('w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}>
            <Tabs value={currentCategory}>
                <TabsList variant="line">
                    {tabs?.map((tab) => (
                        <Link key={tab?.value} href={`/blog/${tab?.value}/1`}>
                            <TabsTrigger value={tab?.value}>{tab?.label}</TabsTrigger>
                        </Link>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
};

export default BlogCategoryTabs;
