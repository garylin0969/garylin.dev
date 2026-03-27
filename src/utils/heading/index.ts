/**
 * 將標題文字轉為可用於錨點連結的穩定 ID。
 *
 * 保留中文、英數與連字號，並將空白轉為連字號，
 * 讓文章標題、目錄連結與捲動定位使用同一套規則。
 */
export const createHeadingId = (text: string) => {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};
