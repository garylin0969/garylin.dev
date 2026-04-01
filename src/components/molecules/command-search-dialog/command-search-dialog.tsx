'use client';

import dynamic from 'next/dynamic';
import { useCommandSearch } from '@/providers';

// 依照 Next.js 官方建議，使用 dynamic import 來延遲載入元件。
// 這樣 Header 初始載入時只需要一顆按鈕，不會把搜尋對話框、
// 文章搜尋邏輯與相關依賴一起打進第一波載入路徑。
// 一旦使用者開啟過一次，就保留實例，避免後續重開時再次重新載入。
const CommandSearch = dynamic(() => import('@/components/molecules/command-search'));

/**
 * 搜尋對話框元件。
 *
 * 提供全站文章搜尋功能，支援標題、描述、分類、標籤和標題內容的搜尋。
 * 搜尋結果會根據分類進行分組顯示。
 *
 */
const CommandSearchDialog = () => {
    const { open, hasOpened, setOpen } = useCommandSearch();

    // 在真正開啟搜尋前，不先載入 `CommandSearch`。
    // 這樣 Header 初始載入時只需要一顆按鈕，不會把搜尋對話框、
    // 文章搜尋邏輯與相關依賴一起打進第一波載入路徑。
    // 一旦使用者開啟過一次，就保留實例，避免後續重開時再次重新載入。
    if (!open && !hasOpened) {
        return null;
    }

    return <CommandSearch open={open} onOpenChange={setOpen} />;
};

export default CommandSearchDialog;
