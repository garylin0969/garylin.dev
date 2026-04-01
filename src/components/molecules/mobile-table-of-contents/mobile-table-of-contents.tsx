import TableOfContents from '@/components/molecules/table-of-contents';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/utils/shadcn';

interface MobileTableOfContentsProps {
    /** 額外 CSS 類別。 */
    className?: string;
    /** 文章標題列表。 */
    headings: { level: number; text: string }[];
}

/**
 * 行動版目錄元件。
 *
 * 以手風琴形式顯示文章目錄。
 *
 */
const MobileTableOfContents = ({ className, headings }: MobileTableOfContentsProps) => {
    return (
        <Accordion type="single" collapsible className={cn(className)}>
            <AccordionItem value="table-of-contents">
                <AccordionTrigger className="bg-primary/10 text-primary items-center rounded-xs px-2 text-lg font-semibold no-underline!">
                    Table of contents
                </AccordionTrigger>
                <AccordionContent className="p-4">
                    <TableOfContents headings={headings} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default MobileTableOfContents;
