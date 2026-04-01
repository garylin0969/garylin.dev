import { MetadataRoute } from 'next';
import { DOMAIN, POSTS_PER_PAGE } from '@/constants/site';
import { getAllCategories, getAllPosts } from '@/utils/post';

type SitemapEntry = MetadataRoute.Sitemap[0];

const SITE_LAUNCHED_AT = new Date('2024-10-01T00:00:00.000Z');

/**
 * 生成網站地圖 (sitemap.xml)。
 *
 * 包含靜態頁面、分類頁面和文章頁面的路由資訊。
 * 用於幫助搜尋引擎索引網站內容。
 *
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts();
    const categories = getAllCategories();

    // 使用最新內容時間作為列表型頁面的 lastModified
    const latestContentDate =
        posts?.length > 0 ? new Date(posts[0]?.updatedAt || posts[0]?.createdAt || SITE_LAUNCHED_AT) : SITE_LAUNCHED_AT;

    // 預計算每個分類的文章數量，避免重複篩選
    const categoryPostCounts = new Map<string, number>([
        ['all', posts.length],
        ...categories.map((category): [string, number] => [
            category?.toLowerCase() || '',
            posts.filter((post) => post?.category?.toLowerCase() === category?.toLowerCase()).length,
        ]),
    ]);

    // 基本頁面路由
    const staticRoutes: SitemapEntry[] = [
        {
            url: DOMAIN,
            lastModified: latestContentDate,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${DOMAIN}/about`,
            lastModified: SITE_LAUNCHED_AT,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${DOMAIN}/blog`,
            lastModified: latestContentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // 分類頁面路由（包含分頁）
    const categoryRoutes: SitemapEntry[] = Array.from(categoryPostCounts.entries()).flatMap(([category, postCount]) => {
        const totalPages = Math.ceil(postCount / POSTS_PER_PAGE);
        return Array.from({ length: totalPages }, (_, index): SitemapEntry => {
            const page = index + 1;
            return {
                url: `${DOMAIN}/blog/${category}/${page}`,
                lastModified: latestContentDate,
                changeFrequency: 'daily',
                priority: page === 1 ? 0.9 : 0.8, // 第一頁優先級較高
            };
        });
    });

    // 文章頁面路由
    const postRoutes: SitemapEntry[] = posts.map(
        (post): SitemapEntry => ({
            url: `${DOMAIN}${post?.permalink}`,
            lastModified: new Date(post?.updatedAt || post?.createdAt || SITE_LAUNCHED_AT),
            changeFrequency: 'weekly',
            priority: 0.7,
        })
    );

    return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
