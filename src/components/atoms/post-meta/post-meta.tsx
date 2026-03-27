import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/shadcn';

/**
 * 文章元數據元件的屬性介面。
 */
interface PostMetaProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 文章日期 (ISO 格式或 Date 物件)。 */
    date: string;
    /** 文章更新日期 (ISO 格式或 Date 物件)。 */
    updateDate?: string;
    /** 文章分類 (可選)。 */
    category?: string;
    /** 是否為分類添加連結 (預設為 true)。 */
    useLink?: boolean;
}

/**
 * 文章元數據元件。
 *
 * 顯示文章的發布日期和分類。
 *
 * @param className - 額外的 CSS 類名 {@link PostMetaProps.className}。
 * @param date - 文章日期 {@link PostMetaProps.date}。
 * @param updateDate - 文章更新日期 {@link PostMetaProps.updateDate}。
 * @param category - 文章分類 {@link PostMetaProps.category}。
 * @param useLink - 是否使用連結 {@link PostMetaProps.useLink}。
 */
export const PostMeta = ({ className, date, updateDate, category, useLink = true }: PostMetaProps) => {
    // 格式化日期
    const formattedDate = formatDate(date, 'YYYY/MM/DD');
    const formattedUpdateDate = updateDate ? formatDate(updateDate, 'YYYY/MM/DD') : null;

    return (
        <div className={cn('text-muted-foreground text-sm', className)}>
            <div className="flex items-center gap-x-3">
                <time dateTime={date}>{formattedDate}</time>
                {category && (
                    <>
                        {useLink ? (
                            <Link href={`/blog/${category}/1`}>
                                <Badge variant="outline" className="px-2 py-1">
                                    {category}
                                </Badge>
                            </Link>
                        ) : (
                            <Badge variant="outline" className="px-2 py-1">
                                {category}
                            </Badge>
                        )}
                    </>
                )}
            </div>
            {updateDate && (
                <span>
                    最後更新日期：<time dateTime={updateDate}>{formattedUpdateDate}</time>
                </span>
            )}
        </div>
    );
};
