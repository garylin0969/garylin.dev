import { MapPinIcon, MailIcon } from 'lucide-react';
import BaseAvatar from '@/components/atoms/base-avatar';
import SocialLinks from '@/components/molecules/social-links';
import { AUTHOR_INFO } from '@/constants/author-info';
import { cn } from '@/utils/shadcn';

/**
 * 作者卡片元件的屬性介面。
 */
interface AuthorCardProps {
    /** 額外的 CSS 類名。 */
    className?: string;
}

/**
 * 作者卡片元件。
 *
 * 顯示作者的頭像、名稱、位置、電子郵件和社交連結。
 *
 */
const AuthorCard = ({ className }: AuthorCardProps) => {
    return (
        <div className={cn('w-74', className)}>
            <div className="space-y-3">
                <BaseAvatar
                    className="mx-auto size-33"
                    src={AUTHOR_INFO.avatar}
                    alt={AUTHOR_INFO.name}
                    fallback="author"
                />
                <div className="text-center text-2xl font-bold">{AUTHOR_INFO.name}</div>
                <ul className="flex flex-col items-center gap-y-2 text-sm">
                    <li className="flex items-center gap-x-2">
                        <MapPinIcon className="size-5" />
                        <span>{AUTHOR_INFO.location}</span>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <MailIcon className="size-5" />
                        <a
                            className="hover:text-primary"
                            href={`mailto:${AUTHOR_INFO.email}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <span>{AUTHOR_INFO.email}</span>
                        </a>
                    </li>
                </ul>
                <SocialLinks className="flex items-center justify-center" />
            </div>
        </div>
    );
};

export default AuthorCard;
