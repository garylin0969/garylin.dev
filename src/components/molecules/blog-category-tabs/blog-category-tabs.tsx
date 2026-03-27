import Link from 'next/link';
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
            <nav aria-label="Blog categories">
                <ul className="border-border inline-flex min-w-max items-center gap-1 border-b">
                    {tabs?.map((tab) => {
                        const isActive = currentCategory === tab?.value;

                        return (
                            <li key={tab?.value}>
                                <Link
                                    href={`/blog/${tab?.value}/1`}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={cn(
                                        'text-muted-foreground inline-flex h-9 items-center justify-center border-b-2 border-transparent px-4 text-sm font-medium whitespace-nowrap transition-colors',
                                        'hover:text-foreground',
                                        'focus-visible:border-ring focus-visible:ring-ring/50 rounded-t-md outline-none focus-visible:ring-3',
                                        isActive && 'text-foreground border-primary'
                                    )}
                                >
                                    {tab?.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default BlogCategoryTabs;
