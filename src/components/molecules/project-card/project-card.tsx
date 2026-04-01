import Image from 'next/image';
import TagList from '@/components/atoms/tag-list';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
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
    /** hover 時最多顯示的標籤數量 (可選)。 */
    maxVisible?: number;
    /** 專案資料物件。 */
    project: (typeof PROJECT_LIST)[number];
}

/**
 * 專案卡片元件。
 *
 * 顯示專案的縮圖、名稱與描述。
 * 滑鼠懸停時於縮圖上方顯示技術標籤 overlay。
 *
 */
const ProjectCard = ({ className, imageLoading = 'lazy', badge, maxVisible, project }: ProjectCardProps) => {
    return (
        <a href={project.url} className={cn('group relative', className)} target="_blank" rel="noreferrer noopener">
            {badge && <Badge className="absolute -top-2 -right-2 z-10 px-2 py-1">{badge}</Badge>}
            <Card className="h-full gap-0 p-0">
                <div className="relative">
                    {/* 技術標籤 Overlay */}
                    <div className="absolute inset-0 z-10 grid place-items-center bg-black/80 px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <TagList tags={project?.tags} maxVisible={maxVisible} />
                    </div>
                    <AspectRatio ratio={16 / 9} className="overflow-hidden">
                        <Image
                            className="object-cover"
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
                    {/* 專案描述 */}
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardContent>
            </Card>
        </a>
    );
};

export default ProjectCard;
