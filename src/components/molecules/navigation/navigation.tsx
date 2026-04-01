'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ROUTES } from '@/constants/navigation';
import { cn } from '@/utils/shadcn';

/**
 * 導航元件的屬性介面。
 */
interface NavigationProps {
    /** 導航列表的 CSS 類名。 */
    listClassName?: string;
    /** 導航連結的 CSS 類名。 */
    linkClassName?: string;
    /** 點擊導航連結時觸發。 */
    onNavigate?: (href: string) => void;
}

/**
 * 導航元件。
 *
 * 顯示網站的主要導航連結。
 * 支援自定義樣式，並會自動標記當前頁面為活動狀態。
 *
 */
const Navigation = ({ listClassName, linkClassName, onNavigate }: NavigationProps) => {
    const currentPath = usePathname();

    // 判斷是否為當前頁面
    const isActive = (href: string) => {
        // 根目錄直接比較
        if (href === '/') {
            return currentPath === '/';
        }

        // 比較第一個路徑段
        const currentSection = currentPath?.split('/')[1];
        const targetSection = href?.split('/')[1];

        return currentSection === targetSection;
    };

    return (
        // 這裡不再使用較重的 `NavigationMenu` 元件。
        // 目前需求其實只有「渲染幾個固定連結 + 標示目前所在區段」，
        // 用單純的 Link 結構即可達成，同時能降低 Header 這條共享路徑的 client 成本。
        <nav aria-label="Primary">
            <ul className={cn('flex items-center gap-1', listClassName)}>
                {NAVIGATION_ROUTES.map((route) => {
                    const active = isActive(route.href);

                    return (
                        <li key={route.href}>
                            <Link
                                href={route.href}
                                onClick={() => onNavigate?.(route.href)}
                                className={cn(
                                    'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-bold transition-colors',
                                    'hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-3',
                                    active ? 'text-primary' : 'text-foreground',
                                    linkClassName
                                )}
                                aria-current={active ? 'page' : undefined}
                            >
                                {route.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
