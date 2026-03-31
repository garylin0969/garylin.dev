import Image from 'next/image';
import TagList from '@/components/atoms/tag-list';
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
    return (
        <a
            href={project.url}
            className={cn('group', badge && 'relative', className)}
            target="_blank"
            rel="noreferrer noopener"
        >
            {badge && <Badge className="absolute -top-2 -right-2 z-10 px-2 py-1">{badge}</Badge>}
            <Card className="h-full gap-0 p-0">
                <div className="w-full overflow-hidden">
                    <AspectRatio ratio={16 / 9} className="overflow-hidden">
                        <Image
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            src={project.image}
                            alt={project.name}
                            loading={imageLoading}
                            fill
                        />
                    </AspectRatio>
                </div>
                <CardContent className="space-y-6 p-6">
                    {/* 專案標題 */}
                    <CardTitle className="group-hover:text-primary">{project.name}</CardTitle>
                    {/* 專案標籤 */}
                    <TagList tags={project?.tags} tagVariant="secondary" maxVisible={maxVisible} />
                </CardContent>
            </Card>
        </a>
    );
};

export default ProjectCard;
