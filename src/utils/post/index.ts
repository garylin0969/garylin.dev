import { posts, type Post } from '@velite';
import { POSTS_PER_PAGE } from '@/constants/site';

/**
 * 文章查詢選項。
 */
interface Options {
    /** 排序方式：'asc' (升序) 或 'desc' (降序)。 */
    sort?: 'asc' | 'desc';
    /** 是否包含草稿文章。 */
    draft?: boolean;
}

type CategoryStats = {
    category: string;
    count: number;
};

// `posts` 是建置時產出的靜態資料，但原本每次呼叫 helper 都會重複：
// 1. 把字串日期轉成 Date
// 2. 重跑排序
// 3. 再做 filter / find
// 這裡先把常用的時間戳與排序結果預算好，讓後續查詢可以直接重用。
const createdAtMap = new Map(posts.map((post) => [post.slug, new Date(post.createdAt).getTime()]));

const sortedPosts = [...posts].sort((a, b) => (createdAtMap.get(b.slug) ?? 0) - (createdAtMap.get(a.slug) ?? 0));

// 先依發布狀態拆成 published / draft，原因有兩個：
// 1. 前台絕大多數查詢都只應該讀到已發布文章
// 2. sitemap、slug 查詢、分類頁都能直接走已整理好的索引，避免混入草稿
const publishedPosts = sortedPosts.filter((post) => !post?.draft);
const draftPosts = sortedPosts.filter((post) => !!post?.draft);

// 建立 slug -> post 的 Map，讓 slug 查詢可以 O(1) 取得文章。
// 分別建立 publishedPostsBySlug 與 allPostsBySlug，
// 讓需要「只看已發布文章」與「可包含草稿」的場景可以明確切換。
const publishedPostsBySlug = new Map(publishedPosts.map((post) => [post.slug, post]));
const allPostsBySlug = new Map(sortedPosts.map((post) => [post.slug, post]));

// 建立 category -> post[] 的 Map，讓分類查詢可以 O(1) 取得文章陣列。
// 分別建立 publishedCategoryMap 與 draftCategoryMap，
// 讓需要「只看已發布文章」與「可包含草稿」的場景可以明確切換。
const buildCategoryMap = (items: Post[]) => {
    return items.reduce((map, post) => {
        const category = post?.category;

        if (!category) {
            return map;
        }

        const key = category.toLowerCase();
        const bucket = map.get(key);

        if (bucket) {
            bucket.push(post);
            return map;
        }

        map.set(key, [post]);
        return map;
    }, new Map<string, Post[]>());
};

const publishedCategoryMap = buildCategoryMap(publishedPosts);
const draftCategoryMap = buildCategoryMap(draftPosts);

// 分類統計也一併預算好，讓 sitemap、分類頁、分類 tabs 等場景
// 不必每次重新掃完整份文章陣列再計數。
const buildCategoryStats = (items: Map<string, Post[]>): CategoryStats[] => {
    return Array.from(items.entries()).map(([category, categoryPosts]) => ({
        category: categoryPosts[0]?.category ?? category,
        count: categoryPosts.length,
    }));
};

const publishedCategoryStats = buildCategoryStats(publishedCategoryMap);
const draftCategoryStats = buildCategoryStats(draftCategoryMap);

/**
 * 對文章列表進行排序。
 *
 */
export const sortPosts = (posts: Post[], sort: 'asc' | 'desc' = 'desc') => {
    return [...posts].sort((a, b) => {
        const aCreatedAt = createdAtMap.get(a.slug) ?? 0;
        const bCreatedAt = createdAtMap.get(b.slug) ?? 0;

        if (sort === 'asc') {
            return aCreatedAt - bCreatedAt;
        }
        return bCreatedAt - aCreatedAt;
    });
};

/**
 * 獲取所有文章。
 *
 */
export const getAllPosts = () => {
    return sortedPosts;
};

/**
 * 獲取所有已發布的文章 (不包含草稿)。
 *
 */
export const getPublishedPosts = () => {
    return publishedPosts;
};

/**
 * 獲取所有草稿文章。
 *
 */
export const getDraftPosts = () => {
    return draftPosts;
};

/**
 * 根據 Slug 獲取特定文章。
 *
 */
export const getPostBySlug = (slug: string) => {
    return publishedPostsBySlug.get(slug);
};

/**
 * 根據 Slug 獲取任意文章（包含草稿）。
 *
 */
export const getAnyPostBySlug = (slug: string) => {
    return allPostsBySlug.get(slug);
};

/**
 * 獲取指定文章的相鄰文章（上一篇與下一篇）。
 *
 * 文章按發布日期降序排列，因此「上一篇」為較新的文章，「下一篇」為較舊的文章。
 *
 */
export const getAdjacentPosts = (slug: string) => {
    const publishedPosts = getPublishedPosts();
    const currentIndex = publishedPosts.findIndex((post) => post?.slug === slug);

    if (currentIndex === -1) {
        return { previousPost: undefined, nextPost: undefined };
    }

    const previousPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : undefined;
    const nextPost = currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : undefined;

    return { previousPost, nextPost };
};

/**
 * 根據分類獲取文章。
 *
 */
export const getPostByCategory = (category: string, options: Options = { sort: 'desc', draft: false }) => {
    // 每個分類的文章在建立索引時就已經依日期降序排列，
    // 因此這裡若需要升序，只要反轉陣列即可，不需要重新排序整份資料。
    const categoryPosts = (options.draft ? draftCategoryMap : publishedCategoryMap).get(category.toLowerCase()) ?? [];
    return options.sort === 'asc' ? [...categoryPosts].reverse() : categoryPosts;
};

/**
 * 根據標籤獲取文章。
 *
 */
export const getPostByTag = (tag: string) => {
    return publishedPosts.filter((post) => post?.tags?.includes(tag));
};

/**
 * 獲取所有不重複的分類。
 *
 */
export const getAllCategories = (options: Options = { sort: 'desc', draft: false }) => {
    const stats = options.draft ? draftCategoryStats : publishedCategoryStats;
    return stats.map((item) => item.category);
};

/**
 * 獲取所有不重複的標籤。
 *
 */
export const getAllTags = (options: Options = { sort: 'desc', draft: false }) => {
    const filteredPosts = options.draft ? draftPosts : publishedPosts;
    return [...new Set(filteredPosts.flatMap((post) => post?.tags).filter(Boolean))];
};

/**
 * 獲取最新文章。
 *
 */
export const getLatestPosts = (limit: number = 5) => {
    return publishedPosts.slice(0, limit);
};

/**
 * 檢查分類是否存在。
 *
 */
export const isCategoryExists = (category: string): boolean => {
    if (category === 'all') {
        return true;
    }

    const valid = getAllCategories()
        ?.map((category) => category?.toLowerCase())
        ?.includes(category?.toLowerCase());

    return valid;
};

/**
 * 獲取所有分類的統計資料 (包含文章數量)。
 *
 */
export const getCategoryStats = (options: Options = { sort: 'desc', draft: false }) => {
    return options.draft ? draftCategoryStats : publishedCategoryStats;
};

/**
 * 獲取分頁後的文章列表。
 *
 */
export const getPaginatedPosts = (
    category: string,
    page: number,
    limit: number = POSTS_PER_PAGE,
    options: Options = { sort: 'desc', draft: false }
) => {
    const posts = category === 'all' ? getPublishedPosts() : getPostByCategory(category, options);
    const totalPages = Math.ceil(posts.length / limit);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedPosts = posts.slice(start, end);

    return {
        posts: paginatedPosts,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
};
