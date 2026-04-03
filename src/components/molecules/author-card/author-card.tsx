import { MailIcon } from 'lucide-react';
import BaseAvatar from '@/components/atoms/base-avatar';
import SocialLinks from '@/components/molecules/social-links';
import { Separator } from '@/components/ui/separator';
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
        <div className={cn('flex items-center justify-center', className)}>
            <div className="items-center gap-x-6 md:flex">
                <BaseAvatar
                    className="mx-auto mb-1.5 size-32 shrink-0 md:mb-0"
                    src={AUTHOR_INFO.avatar}
                    alt={AUTHOR_INFO.name}
                    fallback="author"
                />
                <div className="space-y-1.5 text-center md:text-start">
                    <div className="text-2xl font-bold">{AUTHOR_INFO.name}</div>
                    <div className="text-muted-foreground text-sm">Frontend Developer · {AUTHOR_INFO.location}</div>
                    <div className="text-muted-foreground flex items-center gap-x-3 text-sm">
                        <a
                            className="hover:text-primary flex items-center gap-x-1.5"
                            href={`mailto:${AUTHOR_INFO.email}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <MailIcon className="size-4" />
                            <span>{AUTHOR_INFO.email}</span>
                        </a>
                        <Separator orientation="vertical" />
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorCard;
