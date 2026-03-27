import type { Metadata } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 生成部落格首頁的元數據。
 *
 * @returns 部落格首頁元數據物件。
 */
export const generateBlogMetadata = (): Metadata => {
    return {
        title: 'Blog',
        description: '瀏覽 Gary Lin 的文章，涵蓋前端開發、React.js、Next.js 等主題',
        alternates: {
            canonical: `${DOMAIN}/blog`,
        },
        openGraph: {
            title: 'Blog | Gary Lin',
            description: '瀏覽 Gary Lin 的文章，涵蓋前端開發、React.js、Next.js 等主題',
            url: `${DOMAIN}/blog`,
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
            title: 'Blog | Gary Lin',
            description: '瀏覽 Gary Lin 的文章，涵蓋前端開發、React.js、Next.js 等主題',
            images: ['/favicons/android-chrome-512x512.png'],
        },
    };
};
