import { notFound, redirect } from 'next/navigation';
import { getAllCategories, isCategoryExists } from '@/utils/post';

/**
 * 生成靜態路由參數。
 *
 * 預先計算所有分類的路徑，用於靜態生成 (SSG)。
 * 包含 'all' 分類和各個具體分類。
 *
 */
export async function generateStaticParams() {
    const categories = getAllCategories();
    return [
        { category: 'all' },
        ...categories.map((category) => ({
            category: category?.toLowerCase(),
        })),
    ];
}

/**
 * 部落格分類頁面。
 *
 * 處理分類路由的重定向邏輯。
 * 將 /blog/[category] 重定向到 /blog/[category]/1 (第一頁)。
 * 如果分類不存在，則返回 404。
 *
 */
const page = async ({ params }: { params: Promise<{ category: string }> }) => {
    const { category } = await params;

    // 檢查分類是否有效（除了 'all' 之外）
    if (category !== 'all' && !isCategoryExists(category)) {
        notFound();
    }

    redirect(`/blog/${category}/1`);
};

export default page;
