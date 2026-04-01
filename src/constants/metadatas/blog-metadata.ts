import type { Metadata } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 生成部落格首頁的元數據。
 *
 */
export const generateBlogMetadata = (): Metadata => {
    const description = "Read Gary Lin's blog about frontend development, React.js, Next.js, and related topics";

    return {
        title: 'Blog',
        description,
        alternates: {
            canonical: `${DOMAIN}/blog`,
        },
        openGraph: {
            title: 'Blog | Gary Lin',
            description,
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
            description,
            images: ['/favicons/android-chrome-512x512.png'],
        },
    };
};
