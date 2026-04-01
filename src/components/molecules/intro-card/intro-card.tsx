import { cn } from '@/utils/shadcn';

/**
 * 簡介卡片元件的屬性介面。
 */
interface IntroCardProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 要顯示的文字列表。 */
    list?: string[];
    /** 列表項目的 CSS 類名。 */
    listClassName?: string;
}

/**
 * 簡介卡片元件。
 *
 * 顯示帶有漸層背景效果的文字列表卡片。
 *
 * @param className - 額外的 CSS 類名 {@link IntroCardProps.className}。
 * @param list - 文字列表 {@link IntroCardProps.list}。
 * @param listClassName - 列表項目樣式 {@link IntroCardProps.listClassName}。
 */
const IntroCard = ({ className, list, listClassName }: IntroCardProps) => {
    return (
        <div className={cn('leading-[1.75] font-semibold', className)}>
            {list?.map((text) => (
                <p key={text} className={listClassName}>
                    {text}
                </p>
            ))}
        </div>
    );
};

export default IntroCard;
