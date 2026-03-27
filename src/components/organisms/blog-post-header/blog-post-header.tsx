import { PostMeta } from '@/components/atoms/post-meta/post-meta';
import { TagList } from '@/components/atoms/tag-list';
import { cn } from '@/utils/shadcn';

interface BlogPostHeaderProps {
    /** 額外 CSS 類別。 */
    className?: string;
    /** 文章標題。 */
    title: string;
    /** 文章日期 (ISO 格式)。 */
    date: string;
    /** 文章更新日期 (ISO 格式)。 */
    updateDate?: string;
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
 * @param date - 文章日期 {@link BlogPostHeaderProps.date}。
 * @param updateDate - 文章更新日期 {@link BlogPostHeaderProps.updateDate}。
 * @param category - 文章分類 {@link BlogPostHeaderProps.category}。
 * @param tags - 文章標籤 {@link BlogPostHeaderProps.tags}。
 */
const BlogPostHeader = ({ className, title, date, updateDate, category, tags }: BlogPostHeaderProps) => {
    return (
        <header className={cn('space-y-3 border-b pb-4', className)}>
            <h1 className="text-4xl font-bold">{title}</h1>
            <PostMeta date={date} updateDate={updateDate} category={category} />
            <TagList tags={tags} />
        </header>
    );
};

export default BlogPostHeader;
