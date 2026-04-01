import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/shadcn';

/**
 * 文章元數據元件的屬性介面。
 */
interface PostMetaProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 文章日期 (ISO 格式或 Date 物件)。 */
    createdAt: string;
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
 * @param createdAt - 文章日期 {@link PostMetaProps.createdAt}。
 * @param category - 文章分類 {@link PostMetaProps.category}。
 * @param useLink - 是否使用連結 {@link PostMetaProps.useLink}。
 */
export const PostMeta = ({ className, createdAt, category, useLink = true }: PostMetaProps) => {
    // 格式化日期
    const formattedDate = formatDate(createdAt, 'YYYY/MM/DD');

    return (
        <div className={cn('text-muted-foreground flex items-center justify-between text-sm', className)}>
            <div className="flex items-center gap-x-2">
                <time dateTime={createdAt}>{formattedDate}</time>
                <Separator orientation="vertical" />
                {category && (
                    <>
                        {useLink ? (
                            <Link href={`/blog/${category}/1`}>
                                <Badge variant="outline" className="p-2">
                                    {category}
                                </Badge>
                            </Link>
                        ) : (
                            <Badge variant="outline" className="p-2">
                                {category}
                            </Badge>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
