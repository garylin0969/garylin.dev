'use client';

import { SearchIcon } from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useCommandSearch } from '@/providers';

interface CommandSearchButtonProps {
    className?: string;
}

/**
 * 搜尋按鈕元件。
 *
 * 點擊後開啟搜尋對話框。
 *
 */
const CommandSearchButton = ({ className }: CommandSearchButtonProps) => {
    const { setOpen } = useCommandSearch();

    // 搜尋按鈕本身只負責切換全域搜尋狀態。
    // 真正的對話框由 layout 裡的單一實例負責渲染，
    // 這樣桌機版與手機版可以共用同一套狀態與同一個 dialog，
    // 不會因為畫面上有兩顆搜尋按鈕就同時掛出兩份搜尋元件。
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
        </div>
    );
};

export default CommandSearchButton;
