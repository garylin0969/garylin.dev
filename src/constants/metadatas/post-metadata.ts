import type { Metadata } from 'next';
import { DEFAULT_OPEN_GRAPH_IMAGE, DOMAIN } from '@/constants/site';

/**
 * 文章資料介面。
 */
interface Post {
    /** 文章標題。 */
    title: string;
    /** 文章描述。 */
    description?: string;
    /** 文章發布日期。 */
    createdAt: string;
    /** 文章 Slug。 */
    slug: string;
    /** 文章封面圖片 URL。 */
    image?: string;
    /** 文章標籤。 */
    tags?: string[];
    /** 文章永久連結。 */
    permalink?: string;
}

/**
 * 生成文章頁面的元數據。
 *
 * 根據文章內容動態生成元數據，包含 OpenGraph 和 Twitter 卡片。
 * 如果文章有封面圖片則使用，否則使用網站預設分享圖片。
 *
 */
export const generatePostMetadata = (post: Post): Metadata => {
    const description = post.description || post.title;
    const canonicalUrl = `${DOMAIN}${post.permalink ?? `/blog/${post.slug}`}`;

    // 優先使用文章自己的封面圖；若文章沒有封面圖，則回退到全站預設分享圖。
    const ogImage = post.image
        ? {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
          }
        : {
              url: DEFAULT_OPEN_GRAPH_IMAGE,
              width: 1200,
              height: 630,
              alt: 'Gary Lin',
          };

    return {
        title: post.title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${post.title} - Gary Lin`,
            description,
            url: canonicalUrl,
            locale: 'zh_TW',
            type: 'article',
            publishedTime: post.createdAt,
            authors: ['Gary Lin'],
            tags: post.tags,
            images: [ogImage],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} - Gary Lin`,
            description,
            images: [ogImage],
        },
    };
};

/**
 * 生成文章未找到頁面的元數據。
 *
 */
export const generatePostNotFoundMetadata = (): Metadata => {
    return {
        title: 'Post Not Found',
    };
};
