import BaseImage from '@/components/atoms/base-image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { PROJECT_LIST } from '@/constants/project';
import { cn } from '@/utils/shadcn';

/**
 * 專案卡片元件的屬性介面。
 */
interface ProjectCardProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 圖片是否延遲載入。 */
    imageLoading?: 'eager' | 'lazy';
    /** 右上角顯示的徽章文字 (可選)。 */
    badge?: string;
    /** 最多顯示的標籤數量 (可選)。 */
    maxVisible?: number;
    /** 專案資料物件。 */
    project: (typeof PROJECT_LIST)[number];
}

/**
 * 專案卡片元件。
 *
 * 顯示專案的縮圖、名稱、標籤和連結。
 * 支援限制顯示的標籤數量，超過部分會顯示 "+N more"。
 *
 * @param className - 額外的 CSS 類名 {@link ProjectCardProps.className}。
 * @param imageLoading - 圖片是否延遲載入 {@link ProjectCardProps.imageLoading}。
 * @param badge - 徽章文字 {@link ProjectCardProps.badge}。
 * @param maxVisible - 最多顯示標籤數 {@link ProjectCardProps.maxVisible}。
 * @param project - 專案資料 {@link ProjectCardProps.project}。
 */
const ProjectCard = ({ className, imageLoading = 'lazy', badge, maxVisible, project }: ProjectCardProps) => {
    // 限制顯示的標籤數量
    const visibleTags = project?.tags?.slice(0, maxVisible ?? project.tags.length);
    // 計算剩餘的標籤數量
    const remainingCount = project?.tags?.length - visibleTags?.length;

    return (
        <a
            href={project.url}
            className={cn('group', badge && 'relative', className)}
            target="_blank"
            rel="noreferrer noopener"
        >
            {badge && <Badge className="absolute -top-2 -right-2 z-10 px-2 py-1">{badge}</Badge>}
            <Card className="gap-0 p-0">
                <div className="w-full overflow-hidden">
                    {/* width={0}、height={0} 與 sizes="100vw"，這是 next/image 支援的另一種寫法，代表不預設固定尺寸。 */}
                    <BaseImage
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-110"
                        src={project.image}
                        alt={project.name}
                        loading={imageLoading}
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                </div>
                <CardContent className="space-y-6 p-6">
                    <CardTitle className="group-hover:text-primary">{project.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2">
                        {visibleTags?.map((tag) => (
                            <Badge key={tag} className="px-2 py-1" variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                        {remainingCount > 0 && (
                            <span className="text-muted-foreground text-xs">+{remainingCount} more</span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </a>
    );
};

export default ProjectCard;
