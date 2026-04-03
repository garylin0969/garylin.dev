import { type Post } from '@velite';
import Image from 'next/image';
import Link from 'next/link';
import { PostMeta } from '@/components/atoms/post-meta';
import { cn } from '@/utils/shadcn';

/**
 * 部落格文章卡片元件的屬性介面。
 */
interface BlogPostCardProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 文章資料物件。 */
    post: Post;
}

/**
 * 部落格文章卡片元件。
 *
 * 顯示文章的標題、描述、日期、分類、標籤和縮圖。
 * 點擊卡片可跳轉至文章詳情頁面。
 *
 */
const BlogPostCard = ({ className, post }: BlogPostCardProps) => {
    return (
        <article className={cn('hover:bg-muted/50 rounded-lg px-3 py-4 transition-colors', className)}>
            <Link href={post?.permalink} className="group">
                <div className="flex items-center gap-x-8">
                    {/* 內容區域 */}
                    <div className="min-h-19.25 flex-1">
                        <PostMeta
                            className="mb-3"
                            createdAt={post?.createdAt}
                            category={post?.category}
                            useLink={false}
                        />
                        <div className="space-y-2">
                            <h2
                                className="group-hover:text-primary line-clamp-2 text-[18px] font-bold md:text-xl"
                                title={post?.title}
                            >
                                {post?.title}
                            </h2>
                            <p className="line-clamp-2 text-sm dark:text-[#d1d5dc]" title={post?.description}>
                                {post?.description}
                            </p>
                        </div>
                    </div>
                    {/* 圖片區域 */}
                    {post?.image && (
                        <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden rounded-lg md:block">
                            <Image src={post?.image} alt={post?.title} fill className="object-cover" />
                        </div>
                    )}
                </div>
            </Link>
        </article>
    );
};

export default BlogPostCard;
