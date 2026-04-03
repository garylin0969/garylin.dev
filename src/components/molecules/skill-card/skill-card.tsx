import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/shadcn';

/**
 * 技能卡片元件的屬性介面。
 */
interface SkillCardProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 技能類別標題。 */
    title: string;
    /** 技能列表。 */
    skills: string[];
}

/**
 * 技能卡片元件。
 *
 * 顯示特定類別的技能列表。
 *
 */
const SkillCard = ({ title, skills, className }: SkillCardProps) => {
    return (
        <Card className={cn('gap-0 border-0 bg-muted/30 p-5', className)}>
            <CardHeader className="gap-0 border-b border-border/30 p-0! pb-2!">
                <CardTitle className="text-primary text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="list-inside list-disc space-y-1 p-3">
                    {skills.map((skill) => (
                        <li key={skill} className="text-base">
                            {skill}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default SkillCard;
