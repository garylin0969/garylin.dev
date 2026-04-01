import type { Metadata } from 'next';
import { DEFAULT_OPEN_GRAPH_IMAGE, DOMAIN } from '@/constants/site';

interface GenerateBlogMetadataOptions {
    category?: string;
    page?: number;
}

/**
 * 生成部落格首頁的元數據。
 *
 */
export const generateBlogMetadata = ({ category = 'all', page = 1 }: GenerateBlogMetadataOptions = {}): Metadata => {
    // 原本所有 blog 分頁都共用 `/blog` 的 metadata，
    // 會讓 `/blog/react/2`、`/blog/nextjs/1` 這類頁面在 canonical、OG URL、title 上全都撞在一起。
    // 這裡改成依分類與頁碼生成專屬 metadata，讓搜尋引擎能辨識這些其實是不同頁面。
    const normalizedCategory = category.toLowerCase();
    const isAllCategory = normalizedCategory === 'all';
    const titleParts = ['Blog'];

    if (!isAllCategory) {
        titleParts.push(normalizedCategory);
    }

    if (page > 1) {
        titleParts.push(`Page ${page}`);
    }

    const title = titleParts.join(' - ');
    const path = `/blog/${normalizedCategory}/${page}`;
    const description = isAllCategory
        ? "Read Gary Lin's blog about frontend development, React.js, Next.js, and related topics"
        : `Browse Gary Lin's ${normalizedCategory} articles about frontend development, React.js, Next.js, and related topics`;

    return {
        title,
        description,
        alternates: {
            canonical: `${DOMAIN}${path}`,
        },
        openGraph: {
            title: `${title} - Gary Lin`,
            description,
            url: `${DOMAIN}${path}`,
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
            title: `${title} - Gary Lin`,
            description,
            images: [DEFAULT_OPEN_GRAPH_IMAGE],
        },
    };
};
