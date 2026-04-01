'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NAVIGATION_ROUTES } from '@/constants/navigation';
import { cn } from '@/utils/shadcn';

/**
 * 導航元件的屬性介面。
 */
interface NavigationProps {
    /** 導航選單容器的 CSS 類名。 */
    menuClassName?: string;
    /** 導航列表的 CSS 類名。 */
    listClassName?: string;
    /** 導航項目的 CSS 類名。 */
    itemClassName?: string;
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
const Navigation = ({ menuClassName, listClassName, itemClassName, linkClassName, onNavigate }: NavigationProps) => {
    const pathname = usePathname();

    // 判斷是否為當前頁面
    const isActive = (href: string) => {
        // 根目錄直接比較
        if (href === '/') {
            return pathname === '/';
        }

        // 比較第一個路徑段
        const currentSection = pathname?.split('/')[1];
        const targetSection = href?.split('/')[1];

        return currentSection === targetSection;
    };

    return (
        <NavigationMenu className={menuClassName}>
            <NavigationMenuList className={listClassName}>
                {NAVIGATION_ROUTES.map((route) => (
                    <NavigationMenuItem key={route.href} className={itemClassName}>
                        <NavigationMenuLink asChild>
                            <Link
                                href={route.href}
                                onClick={() => onNavigate?.(route.href)}
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    'bg-transparent font-bold',
                                    'hover:text-primary hover:bg-transparent',
                                    'focus:bg-transparent',
                                    'data-[active=true]:text-primary data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent',
                                    linkClassName
                                )}
                                aria-current={isActive(route.href) ? 'page' : undefined}
                                data-active={isActive(route.href)}
                            >
                                {route.label}
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
