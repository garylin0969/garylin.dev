import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialLink from '@/components/atoms/social-link';
import { SOCIAL_LINKS } from '@/constants/social-links';
import { cn } from '@/utils/shadcn';

const socialIcons = {
    linkedin: FaLinkedin,
    facebook: FaFacebook,
    github: FaGithub,
} as const;
// `SOCIAL_LINKS` 只存 icon key，這裡再把 key 轉回真正的 icon component。
// 這樣 constants 可以維持純資料，UI 元件則保留 icon library 的依賴。

/**
 * 社交連結列表元件的屬性介面。
 */
interface SocialLinksProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 圖示的 CSS 類名。 */
    iconClassName?: string;
}

/**
 * 社交連結列表元件。
 *
 * 顯示一組社交媒體連結圖示。
 *
 */
const SocialLinks = ({ className, iconClassName }: SocialLinksProps) => {
    return (
        <div className={cn('flex items-center gap-x-2', className)}>
            {SOCIAL_LINKS.map((link) => (
                <SocialLink
                    key={link.label}
                    href={link.href}
                    target={link.target}
                    icon={socialIcons[link.icon]}
                    label={link.label}
                    className={iconClassName}
                />
            ))}
        </div>
    );
};

export default SocialLinks;
