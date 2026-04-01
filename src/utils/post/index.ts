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

/**
 * 對文章列表進行排序。
 *
 * @param posts - 要排序的文章列表。
 * @param sort - 排序方式，預設為 'desc' (降序)。
 * @returns 排序後的文章列表。
 */
export const sortPosts = (posts: Post[], sort: 'asc' | 'desc' = 'desc') => {
    return [...posts].sort((a, b) => {
        if (sort === 'asc') {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
};

/**
 * 獲取所有文章。
 *
 * @returns 所有文章的列表 (已排序)。
 */
export const getAllPosts = () => {
    return sortPosts(posts);
};

/**
 * 獲取所有已發布的文章 (不包含草稿)。
 *
 * @returns 已發布文章的列表 (已排序)。
 */
export const getPublishedPosts = () => {
    return sortPosts(posts.filter((post) => !post?.draft));
};

/**
 * 獲取所有草稿文章。
 *
 * @returns 草稿文章的列表 (已排序)。
 */
export const getDraftPosts = () => {
    return sortPosts(posts.filter((post) => post?.draft));
};

/**
 * 根據 Slug 獲取特定文章。
 *
 * @param slug - 文章的 Slug。
 * @returns 對應的文章物件，若找不到則返回 undefined。
 */
export const getPostBySlug = (slug: string) => {
    return sortPosts(posts).find((post) => post?.slug === slug);
};

/**
 * 根據分類獲取文章。
 *
 * @param category - 分類名稱。
 * @param options - 查詢選項 {@link Options}。
 * @returns 符合分類的文章列表。
 */
export const getPostByCategory = (category: string, options: Options = { sort: 'desc', draft: false }) => {
    const filteredPosts = posts.filter(
        (post) => post?.category?.toLowerCase() === category?.toLowerCase() && !!post?.draft === options.draft
    );
    return sortPosts(filteredPosts, options.sort);
};

/**
 * 根據標籤獲取文章。
 *
 * @param tag - 標籤名稱。
 * @returns 符合標籤的文章列表。
 */
export const getPostByTag = (tag: string) => {
    return sortPosts(posts).filter((post) => post?.tags?.includes(tag));
};

/**
 * 獲取所有不重複的分類。
 *
 * @param options - 查詢選項 {@link Options}。
 * @returns 分類名稱列表。
 */
export const getAllCategories = (options: Options = { sort: 'desc', draft: false }) => {
    const filteredPosts = posts.filter((post) => !!post?.draft === options.draft);
    return [...new Set(filteredPosts.map((post) => post?.category).filter(Boolean))];
};

/**
 * 獲取所有不重複的標籤。
 *
 * @param options - 查詢選項 {@link Options}。
 * @returns 標籤名稱列表。
 */
export const getAllTags = (options: Options = { sort: 'desc', draft: false }) => {
    const filteredPosts = posts.filter((post) => !!post?.draft === options.draft);
    return [...new Set(filteredPosts.flatMap((post) => post?.tags).filter(Boolean))];
};

/**
 * 獲取最新文章。
 *
 * @param limit - 要獲取的文章數量，預設為 5。
 * @returns 最新文章列表。
 */
export const getLatestPosts = (limit: number = 5) => {
    return sortPosts(posts).slice(0, limit);
};

/**
 * 檢查分類是否存在。
 *
 * @param category - 要檢查的分類名稱。
 * @returns 如果分類存在則返回 true，否則返回 false。
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
 * @param options - 查詢選項 {@link Options}。
 * @returns 分類統計資料列表，包含分類名稱和文章數量。
 */
export const getCategoryStats = (options: Options = { sort: 'desc', draft: false }) => {
    // 獲取所有分類
    const categories = getAllCategories(options);

    // 如果沒有分類，返回空陣列
    if (categories?.length < 1) {
        return [];
    }

    // 獲取所有分類的統計資料
    return categories
        ?.map((category) => ({
            category,
            count: getPostByCategory(category ?? '', options)?.length,
        }))
        ?.filter((category) => category.count > 0);
};

/**
 * 獲取分頁後的文章列表。
 *
 * @param category - 分類名稱，'all' 表示所有分類。
 * @param page - 當前頁碼。
 * @param limit - 每頁文章數量。
 * @param options - 查詢選項 {@link Options}。
 * @returns 分頁結果，包含文章列表、總頁數、當前頁碼等資訊。
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
