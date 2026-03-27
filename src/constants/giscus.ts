import type { GiscusProps } from '@giscus/react';

/** Giscus 評論系統設定。 */
export const GISCUS_CONFIG: GiscusProps = {
    /** GitHub 儲存庫名稱 (擁有者/儲存庫)。 */
    repo: 'garylin0969/blog',
    /** GitHub 儲存庫 ID。 */
    repoId: 'R_kgDONFDN5Q',
    /** GitHub Discussions 分類名稱。 */
    category: 'General',
    /** GitHub Discussions 分類 ID。 */
    categoryId: 'DIC_kwDONFDN5c4CnIE8',
    /** 頁面與 Discussion 的對應方式 (使用 og:title 進行匹配)。 */
    mapping: 'og:title',
    /** 是否啟用嚴格匹配 ('0' = 關閉, '1' = 開啟)。 */
    strict: '0',
    /** 是否啟用表情反應 ('0' = 關閉, '1' = 開啟)。 */
    reactionsEnabled: '1',
    /** 是否發送元數據 ('0' = 關閉, '1' = 開啟)。 */
    emitMetadata: '0',
    /** 輸入框位置 ('top' = 上方, 'bottom' = 下方)。 */
    inputPosition: 'bottom',
    /** 介面語言。 */
    lang: 'zh-TW',
    /** 載入方式 ('lazy' = 延遲載入)。 */
    loading: 'lazy',
};

/** Giscus 深色主題。 */
export const GISCUS_DARK_THEME = 'dark_tritanopia';

/** Giscus 淺色主題。 */
export const GISCUS_LIGHT_THEME = 'light_tritanopia';
