import type { Metadata } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 生成關於頁面的元數據。
 *
 * @returns 關於頁面元數據物件。
 */
export const generateAboutMetadata = (): Metadata => {
    return {
        title: 'About',
        description: '了解更多關於 Gary Lin 的背景、工作經驗、技能和專案',
        alternates: {
            canonical: `${DOMAIN}/about`,
        },
        openGraph: {
            title: 'About | Gary Lin',
            description: '了解更多關於 Gary Lin 的背景、工作經驗、技能和專案',
            url: `${DOMAIN}/about`,
            locale: 'zh_TW',
            type: 'website',
            images: [
                {
                    url: '/favicons/android-chrome-512x512.png',
                    width: 512,
                    height: 512,
                    alt: 'Gary Lin',
                },
            ],
        },
        twitter: {
            title: 'About | Gary Lin',
            description: '了解更多關於 Gary Lin 的背景、工作經驗、技能和專案',
            images: ['/favicons/android-chrome-512x512.png'],
        },
    };
};
