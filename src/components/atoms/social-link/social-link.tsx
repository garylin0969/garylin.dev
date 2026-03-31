import { IconType } from 'react-icons';
import { cn } from '@/utils/shadcn';

/**
 * 社交連結元件的屬性介面。
 */
interface SocialLinkProps {
    /** 連結目標 URL。 */
    href: string;
    /** 連結開啟方式 (例如 '_blank')。 */
    target: string;
    /** 圖示元件。 */
    icon: IconType;
    /** 連結標籤 (用於無障礙訪問)。 */
    label: string;
    /** 額外的 CSS 類名。 */
    className?: string;
}

/**
 * 社交連結元件。
 *
 * 顯示單個社交媒體連結圖示。
 *
 * @param href - 連結 URL {@link SocialLinkProps.href}。
 * @param target - 開啟方式 {@link SocialLinkProps.target}。
 * @param icon - 圖示元件 {@link SocialLinkProps.icon}。
 * @param label - 連結標籤 {@link SocialLinkProps.label}。
 * @param className - 額外的 CSS 類名 {@link SocialLinkProps.className}。
 */
const SocialLink = ({ href, target, icon: IconComponent, label, className }: SocialLinkProps) => {
    return (
        <a href={href} target={target} rel="noopener noreferrer" aria-label={label}>
            <IconComponent className={cn('size-5', className)} />
        </a>
    );
};

export default SocialLink;
