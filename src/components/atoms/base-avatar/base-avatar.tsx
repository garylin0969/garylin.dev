import { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/**
 * 基礎頭像元件的屬性介面。
 */
interface BaseAvatarProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 圖片來源 URL。 */
    src: string;
    /** 圖片替代文字。 */
    alt: string;
    /** 圖片載入失敗時顯示的後備內容 (預設為 'avatar')。 */
    fallback?: ReactNode;
}

/**
 * 基礎頭像元件。
 *
 * 封裝了 Shadcn UI 的 Avatar 元件，提供統一的圖片和後備內容處理。
 *
 */
const BaseAvatar = ({ className, src, alt, fallback = 'avatar' }: BaseAvatarProps) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
    );
};

export default BaseAvatar;
