import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/shadcn';

/**
 * 標籤列表元件的屬性介面。
 */
interface TagListProps {
    /** 標籤陣列。 */
    tags?: string[];
    /** 容器 CSS 類別。 */
    className?: string;
    /** 標籤的變體。 */
    tagVariant?: 'link' | 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | null;
    /** 最多顯示的標籤數量 (不設定則全部顯示)。 */
    maxVisible?: number;
    /** 標籤的 CSS 類別。 */
    tagClassName?: string;
}

/**
 * 標籤列表元件。
 *
 * 顯示一組標籤，支援限制顯示數量。
 *
 * @param tags - 標籤陣列 {@link TagListProps.tags}。
 * @param maxVisible - 最多顯示數量 {@link TagListProps.maxVisible}。
 */
const TagList = ({ tags, className, tagVariant = 'default', maxVisible, tagClassName }: TagListProps) => {
    if (!tags || tags?.length === 0) {
        return null;
    }

    const visibleTags = maxVisible ? tags?.slice(0, maxVisible) : tags;
    const remainingCount = maxVisible ? tags?.length - maxVisible : 0;

    return (
        <div className={cn('flex flex-wrap items-center gap-2', className)}>
            {/* 顯示標籤 */}
            {visibleTags?.map((tag) => {
                return (
                    <Badge key={tag} variant={tagVariant} className={cn('px-2 py-2 text-xs', tagClassName)}>
                        {tag}
                    </Badge>
                );
            })}
            {/* 顯示剩餘標籤數量 */}
            {remainingCount > 0 && <span className="text-muted-foreground text-xs">+{remainingCount} more</span>}
        </div>
    );
};

export default TagList;
