import { type Post } from '@velite';
import Image from 'next/image';
import Link from 'next/link';
import { PostMeta } from '@/components/atoms/post-meta';
import { TagList } from '@/components/atoms/tag-list';
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
 * @param className - 額外的 CSS 類名 {@link BlogPostCardProps.className}。
 * @param post - 文章資料 {@link BlogPostCardProps.post}。
 */
const BlogPostCard = ({ className, post }: BlogPostCardProps) => {
    return (
        <Link href={post?.permalink} className="group">
            <article className={cn('p-4', className)}>
                <div className="flex items-center gap-x-8">
                    {/* 內容區域 */}
                    <div className="flex-1">
                        <div className="mb-3">
                            <PostMeta useLink={false} date={post?.date} category={post?.category} />
                        </div>

                        <h2 className="group-hover:text-primary mb-2 line-clamp-1 text-xl leading-tight font-bold md:text-2xl">
                            {post?.title}
                        </h2>

                        <p className="text-muted-foreground mb-4 line-clamp-2 text-base leading-relaxed">
                            {post?.description}
                        </p>

                        <TagList tags={post?.tags || []} maxVisible={3} />
                    </div>

                    {/* 圖片區域 */}
                    {post?.image && (
                        <div className="relative hidden h-28 w-28 shrink-0 overflow-hidden sm:block">
                            <Image
                                src={post?.image}
                                alt={post?.title}
                                fill
                                className="object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
};

export default BlogPostCard;
