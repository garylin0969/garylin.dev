import { FaInfoCircle } from 'react-icons/fa';
import { cn } from '@/utils/shadcn';

const LINK_PROPS = {
    target: '_blank',
    rel: 'noopener noreferrer',
} as const;

/**
 * 公告欄元件的屬性介面。
 */
interface NoticeBarProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 公告訊息內容。 */
    message?: string;
    /** 公告連結 (可選)。 */
    link?: string;
}

/**
 * 公告欄元件。
 *
 * 顯示一條公告訊息，可選擇性地包含連結。
 * 若未提供訊息，則不渲染任何內容。
 *
 */
const NoticeBar = ({ className, message, link }: NoticeBarProps) => {
    if (!message) return null;

    const Component = link ? 'a' : 'span';

    return (
        <div className={cn('bg-primary/10 text-primary h-8 py-1', className)}>
            <div className="container mx-auto">
                <div className="flex items-center justify-center gap-x-2">
                    <FaInfoCircle />
                    <Component href={link} {...(link ? LINK_PROPS : {})}>
                        {message}
                    </Component>
                </div>
            </div>
        </div>
    );
};

export default NoticeBar;
