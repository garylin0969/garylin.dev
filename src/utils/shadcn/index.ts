import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合併 Tailwind CSS 類名。
 *
 * 結合了 `clsx` 的條件類名處理和 `tailwind-merge` 的衝突解決功能。
 *
 */
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};
