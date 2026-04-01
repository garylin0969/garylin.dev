import { PostMeta } from '@/components/atoms/post-meta/post-meta';
import TagList from '@/components/atoms/tag-list';
import { cn } from '@/utils/shadcn';

interface BlogPostHeaderProps {
    /** 額外 CSS 類別。 */
    className?: string;
    /** 文章標題。 */
    title: string;
    /** 文章日期 (ISO 格式)。 */
    createdAt: string;
    /** 文章分類。 */
    category?: string;
    /** 文章標籤。 */
    tags: string[];
}

/**
 * 文章標題區塊元件。
 *
 * 顯示文章的標題、元數據（日期、分類）與標籤列表。
 *
 * @param className - 額外 CSS 類別 {@link BlogPostHeaderProps.className}。
 * @param title - 文章標題 {@link BlogPostHeaderProps.title}。
 * @param createdAt - 文章日期 {@link BlogPostHeaderProps.createdAt}。
 * @param category - 文章分類 {@link BlogPostHeaderProps.category}。
 * @param tags - 文章標籤 {@link BlogPostHeaderProps.tags}。
 */
const BlogPostHeader = ({ className, title, createdAt, category, tags }: BlogPostHeaderProps) => {
    return (
        <header className={cn('space-y-3 border-b pb-4', className)}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <PostMeta createdAt={createdAt} category={category} />
            <TagList tags={tags} />
        </header>
    );
};

export default BlogPostHeader;
