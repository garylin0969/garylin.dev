import type { Metadata } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 文章資料介面。
 */
interface Post {
    /** 文章標題。 */
    title: string;
    /** 文章描述。 */
    description?: string;
    /** 文章發布日期。 */
    date: string;
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
 * 如果文章有封面圖片則使用，否則使用網站預設圖示。
 *
 * @param post - 文章資料 {@link Post}。
 * @returns 文章頁面元數據物件。
 */
export const generatePostMetadata = (post: Post): Metadata => {
    const description = post.description || post.title;
    const canonicalUrl = `${DOMAIN}${post.permalink ?? `/blog/${post.slug}`}`;

    // 決定要使用的圖片：post有image就用post的image，沒有就用網站icon
    const ogImage = post.image
        ? {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
          }
        : {
              url: '/favicons/android-chrome-512x512.png',
              width: 512,
              height: 512,
              alt: 'Gary Lin',
          };

    return {
        title: post.title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${post.title} | Gary Lin`,
            description,
            url: canonicalUrl,
            locale: 'zh_TW',
            type: 'article',
            publishedTime: post.date,
            authors: ['Gary Lin'],
            tags: post.tags,
            images: [ogImage],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | Gary Lin`,
            description,
            images: [ogImage],
        },
    };
};

/**
 * 生成文章未找到頁面的元數據。
 *
 * @returns 404 頁面元數據物件。
 */
export const generatePostNotFoundMetadata = (): Metadata => {
    return {
        title: 'Post Not Found',
    };
};
