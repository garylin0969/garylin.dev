import { home, type Home } from '@velite';

/**
 * 獲取首頁內容。
 *
 */
export const getHomePagePost = (): Home | undefined => {
    return home[0];
};
