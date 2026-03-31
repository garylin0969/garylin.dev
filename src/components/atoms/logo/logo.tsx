import Image from 'next/image';
import Link from 'next/link';
import { LOGO_IMAGE_PATH, WEBSITE_TITLE } from '@/constants/site';
import { cn } from '@/utils/shadcn';

/**
 * Logo 元件的屬性介面。
 */
interface LogoProps {
    /** 連結目標 URL (預設為首頁)。 */
    href?: string;
    /** 容器的 CSS 類名。 */
    className?: string;
    /** 圖片的 CSS 類名。 */
    imageClassName?: string;
    /** 圖片寬度。 */
    imageWidth?: number;
    /** 圖片高度。 */
    imageHeight?: number;
    /** 圖片載入策略。 */
    imageLoading?: 'eager' | 'lazy';
    /** 圖片替代文字。 */
    imageAlt?: string;
    /** 是否顯示標題文字 */
    showTitle?: boolean;
    /** 標題文字的 CSS 類名。 */
    titleClassName?: string;
}

/**
 * Logo 元件。
 *
 * 顯示網站 Logo 和標題，並連結到首頁。
 *
 * @param props - 元件屬性 {@link LogoProps}。
 */
const Logo = ({
    href = '/',
    className,
    imageClassName,
    imageWidth = 32,
    imageHeight = 32,
    imageLoading = 'eager',
    imageAlt = 'website logo',
    showTitle = true,
    titleClassName,
}: LogoProps) => {
    return (
        <Link href={href} className={cn('flex items-center gap-x-2', className)}>
            <Image
                src={LOGO_IMAGE_PATH}
                className={imageClassName}
                width={imageWidth}
                height={imageHeight}
                loading={imageLoading}
                alt={imageAlt}
            />
            {showTitle && <span className={cn('text-2xl font-bold', titleClassName)}>{WEBSITE_TITLE}</span>}
        </Link>
    );
};

export default Logo;
