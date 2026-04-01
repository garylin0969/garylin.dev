import { cn } from '@/utils/shadcn';

/**
 * 首頁 Hero 區塊的屬性介面。
 */
interface HomeHeroProps {
    /** 額外 CSS 類別。 */
    className?: string;
    /** 頁面標籤文字。 */
    label?: string;
    /** 主標題。 */
    title: string;
    /** 副標題描述。 */
    description: string;
}

/**
 * 首頁 Hero 區塊元件。
 *
 * 顯示頁面標籤、主標題與副標題描述。
 */
const HomeHero = ({ className, label, title, description }: HomeHeroProps) => {
    return (
        <section className={cn('space-y-4', className)}>
            {label && <p className="text-muted-foreground text-sm font-medium tracking-[0.3em] uppercase">{label}</p>}
            <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
                <p className="text-muted-foreground text-lg">{description}</p>
            </div>
        </section>
    );
};

export default HomeHero;
