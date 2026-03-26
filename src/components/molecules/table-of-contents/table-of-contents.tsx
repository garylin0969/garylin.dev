'use client';

import Link from 'next/link';
import { useActiveHeadings } from '@/hooks';
import { cn } from '@/utils/shadcn';

/**
 * 目錄元件的屬性介面。
 */
interface TableOfContentsProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 標題列表。 */
    headings?: {
        level: number;
        text: string;
    }[];
}

/**
 * 目錄元件。
 *
 * 顯示文章的目錄結構，並根據滾動位置高亮當前標題。
 * 支援多層級縮排顯示。
 *
 * @param className - 額外的 CSS 類名 {@link TableOfContentsProps.className}。
 * @param headings - 標題列表 {@link TableOfContentsProps.headings}。
 */
const TableOfContents = ({ headings, className }: TableOfContentsProps) => {
    const activeHeadings = useActiveHeadings(headings ?? []);

    if (!headings || headings?.length === 0) {
        return null;
    }

    return (
        <nav className={cn(className)}>
            <ul>
                {headings?.map((heading, index) => {
                    const isActive = activeHeadings?.includes(heading?.text);

                    return (
                        <li key={index} className={cn('border-l pl-px', isActive && 'border-primary border-l-2 pl-0')}>
                            <Link
                                title={heading?.text}
                                href={`#${heading?.text}`}
                                className={cn(
                                    'hover:bg-muted hover:text-foreground text-muted-foreground block rounded px-2 py-1 text-sm no-underline! transition-all duration-200',
                                    // 根據標題層級調整縮排
                                    heading?.level === 1 && 'pl-4',
                                    heading?.level === 2 && 'pl-8',
                                    heading?.level === 3 && 'pl-12',
                                    heading?.level === 4 && 'pl-16',
                                    heading?.level === 5 && 'pl-20',
                                    heading?.level === 6 && 'pl-24',
                                    isActive && 'bg-muted text-foreground'
                                )}
                            >
                                {heading?.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default TableOfContents;
