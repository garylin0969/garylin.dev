import type { Metadata } from 'next';
import { DEFAULT_OPEN_GRAPH_IMAGE, DOMAIN } from '@/constants/site';

/**
 * 生成關於頁面的元數據。
 *
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
            title: 'About - Gary Lin',
            description,
            url: `${DOMAIN}/about`,
            locale: 'zh_TW',
            type: 'website',
            images: [
                {
                    url: DEFAULT_OPEN_GRAPH_IMAGE,
                    width: 1200,
                    height: 630,
                    alt: 'Gary Lin',
                },
            ],
        },
        twitter: {
            title: 'About - Gary Lin',
            description,
            images: [DEFAULT_OPEN_GRAPH_IMAGE],
        },
    };
};
