import { useCallback, useEffect, useState } from 'react';

/**
 * 用於監聽鍵盤快捷鍵 (⌘K 或 Ctrl+K) 以開啟搜尋功能的 Hook。
 *
 */
const useCommandSearch = () => {
    const [open, setOpen] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // ⌘K 或 Ctrl+K 開啟搜尋
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setOpen(true);
        }

        // ESC 鍵關閉搜尋
        if (e.key === 'Escape') {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return {
        open,
        setOpen,
    };
};

export default useCommandSearch;
