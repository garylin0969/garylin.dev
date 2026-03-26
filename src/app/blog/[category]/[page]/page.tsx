import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogCategoryTabs from '@/components/molecules/blog-category-tabs';
import BlogPostCard from '@/components/molecules/blog-post-card';
import { PaginationControls } from '@/components/molecules/pagination-controls';
import { generateBlogMetadata } from '@/constants/metadatas';
import { POSTS_PER_PAGE } from '@/constants/site';
import { calculatePaginationState, validatePageNumber } from '@/utils/pagination';
import { getAllCategories, getPaginatedPosts, getPublishedPosts, isCategoryExists } from '@/utils/post';

/**
 * 生成靜態路由參數。
 *
 * 預先計算所有分類的分頁路徑，用於靜態生成 (SSG)。
 * 包含 'all' 分類和各個具體分類的分頁。
 *
 * @returns 靜態參數陣列。
 */
export async function generateStaticParams() {
    const allPosts = getPublishedPosts();
    const allCategories = getAllCategories();

    // 預計算每個分類的文章數量，避免重複篩選
    const categoryPostCounts = new Map<string, number>([
        ['all', allPosts.length], // 'all' 分類包含所有文章
        ...allCategories.map((category): [string, number] => [
            category?.toLowerCase() || '',
            allPosts.filter((post) => post?.category?.toLowerCase() === category?.toLowerCase()).length,
        ]),
    ]);

    // 使用 flatMap 簡化路徑生成邏輯
    return Array.from(categoryPostCounts.entries()).flatMap(([category, postCount]) => {
        const totalPages = Math.ceil(postCount / POSTS_PER_PAGE);
        return Array.from({ length: totalPages }, (_, index) => ({
            category,
            page: (index + 1).toString(),
        }));
    });
}

/**
 * 生成頁面元數據。
 *
 * @returns 頁面元數據物件。
 */
export async function generateMetadata(): Promise<Metadata> {
    return generateBlogMetadata();
}

/**
 * 部落格列表頁面的屬性介面。
 */
interface BlogPageProps {
    /** 路由參數。 */
    params: Promise<{
        /** 分類名稱。 */
        category: string;
        /** 頁碼。 */
        page: string;
    }>;
}

/**
 * 部落格列表頁面。
 *
 * 顯示指定分類和頁碼的文章列表。
 * 包含分頁控制器和文章卡片。
 *
 * @param params - 路由參數 {@link BlogPageProps.params}。
 */
const BlogPage = async ({ params }: BlogPageProps) => {
    const { category, page } = await params;

    // 驗證並處理頁碼
    const validPage = validatePageNumber(page);
    if (!validPage) {
        notFound();
    }

    // 選擇分類
    const selectedCategory = category === 'all' ? 'all' : category;

    // 檢查分類是否存在
    if (!isCategoryExists(selectedCategory)) {
        notFound();
    }

    // 獲取分頁文章
    const { posts, currentPage, totalPages } = getPaginatedPosts(selectedCategory, validPage);

    // 如果沒有文章，顯示 404
    if (posts.length === 0 && currentPage > 1) {
        notFound();
    }

    // 計算分頁狀態
    const paginationState = calculatePaginationState({
        currentPage,
        totalPages,
    });

    // 生成分頁連結
    const getPageUrl = (pageNumber: number) => `/blog/${category}/${pageNumber}`;

    return (
        <div className="mx-auto max-w-3xl space-y-4">
            {/* 分類標籤 */}
            <BlogCategoryTabs currentCategory={category} />
            {/* 文章列表 */}
            <div>
                {posts.map((post) => (
                    <BlogPostCard key={post?.slug} post={post} />
                ))}
            </div>

            {/* 分頁控制器 */}
            <PaginationControls paginationState={paginationState} getPageUrl={getPageUrl} />
        </div>
    );
};

export default BlogPage;
