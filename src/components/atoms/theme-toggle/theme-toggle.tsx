'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMounted } from '@/hooks';

/**
 * 主題切換元件。
 *
 * 用於切換網站的深色/淺色模式。
 * 包含載入狀態處理以避免水合不匹配。
 *
 */
const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    if (!isMounted) {
        return (
            <Button variant="ghost" size="default">
                <Skeleton className="h-5 w-5 rounded-full" />
                <span className="sr-only">切換主題</span>
            </Button>
        );
    }

    return (
        <Button variant="ghost" size="default" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            {resolvedTheme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
            <span className="sr-only">切換主題</span>
        </Button>
    );
};

export default ThemeToggle;
