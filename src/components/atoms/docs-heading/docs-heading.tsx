import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Children, isValidElement, ReactNode } from 'react';
import { createHeadingId } from '@/utils/heading';
import { cn } from '@/utils/shadcn';

/**
 * 文件標題元件的屬性介面。
 */
interface DocsHeadingProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 連結圖示的 CSS 類名。 */
    iconClassName?: string;
    /** 標題層級 (h1-h6)。 */
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /** 標題文字。 */
    title: ReactNode;
}

/**
 * 從 MDX 標題節點中提取可用於錨點與 title 屬性的純文字。
 *
 */
const extractHeadingText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return Children.toArray(node).map(extractHeadingText).join('');
    }

    if (isValidElement(node)) {
        const props = node.props as { children?: ReactNode };
        return extractHeadingText(props.children);
    }

    return '';
};

/**
 * 文件標題元件。
 *
 * 用於渲染文件中的標題，自動生成錨點連結。
 * 滑鼠懸停時會顯示連結圖示。
 *
 */
const DocsHeading = ({ className, iconClassName, as, title }: DocsHeadingProps) => {
    const Component = as;
    const normalizedTitle = extractHeadingText(title);
    const headingId = createHeadingId(normalizedTitle);

    return (
        <Component className={cn('scroll-mt-24', className)} id={headingId}>
            <Link
                href={`#${headingId}`}
                title={normalizedTitle}
                className="group inline-flex items-center gap-x-1 no-underline"
            >
                {title}
                <LinkIcon
                    className={cn(
                        'text-primary opacity-0 transition-opacity group-hover:opacity-100',
                        as === 'h1' && 'size-6',
                        as === 'h2' && 'size-5',
                        as === 'h3' && 'size-4',
                        as === 'h4' && 'size-3.5',
                        as === 'h5' && 'size-3.5',
                        as === 'h6' && 'size-3.5',
                        iconClassName
                    )}
                />
            </Link>
        </Component>
    );
};

export default DocsHeading;
