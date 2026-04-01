'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface CommandSearchContextValue {
    open: boolean;
    hasOpened: boolean;
    setOpen: (open: boolean) => void;
}

const CommandSearchContext = createContext<CommandSearchContextValue | null>(null);

interface CommandSearchProviderProps {
    children: ReactNode;
}

/**
 * 搜尋對話框狀態管理元件。
 *
 * 提供全站搜尋的開啟/關閉狀態、快捷鍵監聽與搜尋索引快取。
 * 透過 Context 讓搜尋按鈕與搜尋對話框能共享狀態，避免重複掛載與重複抓取資料。
 *
 */
const CommandSearchProvider = ({ children }: CommandSearchProviderProps) => {
    const [open, setOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    // `hasOpened` 用來記錄搜尋視窗是否曾經真的被開過。
    // 這樣 `CommandSearchDialog` 就能在第一次開啟後持續保留元件實例，
    // 避免每次關閉再打開都重新掛載元件、重新抓搜尋索引。
    // 另外把 `open` 與 `hasOpened` 一起放在同一個 setter 裡維護，
    // 可以避免在 effect 中再同步 `setState` 觸發 lint 警告。
    const handleOpenChange = useCallback((nextOpen: boolean) => {
        setOpen(nextOpen);

        if (nextOpen) {
            setHasOpened(true);
        }
    }, []);

    // 搜尋快捷鍵是全站共享行為，應該只註冊一次。
    // 若把監聽放在每個搜尋按鈕內，桌機版與手機版按鈕同時存在時，
    // 就會重複綁定 `keydown` listener，造成狀態分裂與多餘成本。
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                handleOpenChange(true);
            }

            if (event.key === 'Escape') {
                handleOpenChange(false);
            }
        },
        [handleOpenChange]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const value = useMemo(
        () => ({
            open,
            hasOpened,
            setOpen: handleOpenChange,
        }),
        [hasOpened, handleOpenChange, open]
    );

    return <CommandSearchContext.Provider value={value}>{children}</CommandSearchContext.Provider>;
};

/**
 * 取得搜尋對話框狀態的 hook。
 *
 * 包含 `open`、`hasOpened` 與 `setOpen` 的物件。
 * 若在 Provider 外部使用，會拋出錯誤。
 */
export const useCommandSearch = () => {
    const context = useContext(CommandSearchContext);

    if (!context) {
        // 這個 hook 依賴 Context，若在 provider 外使用會拿不到狀態。
        // 這裡直接丟錯，讓問題在開發階段就能被明確發現，而不是出現靜默失效。
        throw new Error('useCommandSearch must be used within CommandSearchProvider');
    }

    return context;
};

export default CommandSearchProvider;
