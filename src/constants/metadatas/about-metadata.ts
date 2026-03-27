import type { Metadata } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 生成關於頁面的元數據。
 *
 * @returns 關於頁面元數據物件。
 */
export const generateAboutMetadata = (): Metadata => {
    const description = "Learn more about Gary Lin's background, work experience, skills, and projects";

    return {
        title: 'About',
        description,
        alternates: {
            canonical: `${DOMAIN}/about`,
        },
        openGraph: {
            title: 'About | Gary Lin',
            description,
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
            description,
            images: ['/favicons/android-chrome-512x512.png'],
        },
    };
};
