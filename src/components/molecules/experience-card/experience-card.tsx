import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ExperienceItem } from '@/constants/experience';

/**
 * 經歷卡片元件的屬性介面。
 */
interface ExperienceCardProps {
    /** 經歷資料物件。 */
    experience: ExperienceItem;
}

/**
 * 經歷卡片元件。
 *
 * 顯示單個工作經歷或學歷的詳細資訊。
 * 包含公司/學校 Logo、職稱、時間和詳細說明 (可展開)。
 *
 */
const ExperienceCard = ({ experience }: ExperienceCardProps) => (
    <Card className="gap-y-2 p-2.5">
        <CardHeader className="flex items-center gap-x-2 p-0">
            {/* 使用相對定位容器來保持圖片長寬比 */}
            <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                <Image className="object-contain" src={experience.image} fill alt={experience.company} />
            </div>
            <div className="space-y-1">
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription className="dark:text-[#d1d5dc]">{experience.company}</CardDescription>
                <CardDescription className="dark:text-[#d1d5dc]">
                    {experience.startDate} - {experience.endDate}
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible>
                <AccordionItem value={experience.id}>
                    <AccordionTrigger asChild>
                        <Button className="w-full">View Details</Button>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                        <ul className="text-muted-foreground list-inside list-disc space-y-5 p-3 text-base/[1.75] dark:text-[#d1d5dc]">
                            {experience.details.map((detail, detailIndex) => (
                                <li key={detailIndex}>{detail}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default ExperienceCard;
