'use client';

import { SearchIcon } from 'lucide-react';
import { useCallback } from 'react';
import CommandSearch from '@/components/molecules/command-search';
import { Button } from '@/components/ui/button';
import { useCommandSearch } from '@/hooks';

interface CommandSearchButtonProps {
    className?: string;
}

/**
 * 搜尋按鈕元件。
 *
 * 點擊後開啟搜尋對話框。
 *
 * @param className - 額外的 CSS 類名 {@link CommandSearchButtonProps.className}。
 */
const CommandSearchButton = ({ className }: CommandSearchButtonProps) => {
    const { open, setOpen } = useCommandSearch();

    // 使用 useCallback 優化 onClick 函數
    const handleOpenSearch = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    return (
        <div className="flex items-center justify-center">
            <Button
                variant="ghost"
                size="default"
                className={className}
                onClick={handleOpenSearch}
                aria-label="搜尋文章"
            >
                <SearchIcon className="size-5" />
            </Button>
            <CommandSearch open={open} onOpenChange={setOpen} />
        </div>
    );
};

export default CommandSearchButton;
