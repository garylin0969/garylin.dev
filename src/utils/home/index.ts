import { home, type Home } from '@velite';

/**
 * 獲取首頁內容。
 *
 * @returns 首頁內容物件，若不存在則返回 undefined。
 */
export const getHomePagePost = (): Home | undefined => {
    return home[0];
};
