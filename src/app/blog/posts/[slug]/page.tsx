import { notFound } from 'next/navigation';
import Comments from '@/components/molecules/comments';
import MDXContent from '@/components/molecules/mdx-content';
import MobileTableOfContents from '@/components/molecules/mobile-table-of-contents';
import PostNavigation from '@/components/molecules/post-navigation';
import TableOfContents from '@/components/molecules/table-of-contents';
import BlogPostHeader from '@/components/organisms/blog-post-header';
import { Separator } from '@/components/ui/separator';
import { generatePostMetadata, generatePostNotFoundMetadata } from '@/constants/metadatas';
import { NOTICE_BAR_MESSAGE } from '@/constants/site';
import { getAdjacentPosts, getAnyPostBySlug, getPostBySlug, getPublishedPosts } from '@/utils/post';
import { cn } from '@/utils/shadcn';

/**
 * 文章詳情頁面的屬性介面。
 */
interface PostPageProps {
    /** 路由參數。 */
    params: Promise<{
        /** 文章 Slug。 */
        slug: string;
    }>;
}

/**
 * 生成靜態路由參數。
 *
 * 預先獲取所有已發布文章的 Slug，用於靜態生成 (SSG)。
 *
 */
export async function generateStaticParams() {
    return getPublishedPosts()?.map((post) => ({
        slug: post?.slug,
    }));
}

/**
 * 生成頁面元數據。
 *
 * 根據文章內容動態生成標題、描述等元數據。
 * 如果文章不存在，則返回 404 元數據。
 *
 */
export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        // `getPostBySlug` 現在只會回已發布文章。
        // 若這個 slug 其實存在於草稿中，這裡仍然只回傳 not found metadata，
        // 避免透過猜 slug 的方式把未發布內容暴露到前台或搜尋引擎。
        if (getAnyPostBySlug(slug)) {
            return generatePostNotFoundMetadata();
        }

        return generatePostNotFoundMetadata();
    }

    return generatePostMetadata(post);
}

/**
 * 文章詳情頁面。
 *
 * 顯示文章的完整內容，包含標題、元數據、標籤、目錄、MDX 內容和評論區。
 *
 */
const PostPage = async ({ params }: PostPageProps) => {
    const { slug } = await params;

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { previousPost, nextPost } = getAdjacentPosts(slug);

    return (
        <div className="mx-auto grid max-w-3xl grid-cols-4 lg:max-w-5xl">
            {/* 文章 */}
            <article className="col-span-4 lg:col-span-3 lg:px-4">
                {/* 標題與元數據 */}
                <BlogPostHeader
                    className="mb-6"
                    title={post?.title}
                    createdAt={post?.createdAt}
                    category={post?.category}
                    tags={post?.tags ?? []}
                />
                {/* 行動版目錄 */}
                <MobileTableOfContents className="mb-4 lg:hidden" headings={post?.headings ?? []} />
                {/* MDX 內容 */}
                <div className="prose prose-figcaption:mt-0 prose-figure:m-0 dark:prose-invert max-w-none">
                    <MDXContent code={post?.code} />
                </div>
                <Separator className="my-6" />
                {/* 上一篇、下一篇文章 */}
                <PostNavigation previousPost={previousPost} nextPost={nextPost} />
                <Separator className="my-6" />
                {/* 評論 */}
                <Comments />
            </article>
            {/* 目錄 */}
            <aside
                className={cn(
                    'sticky hidden shrink-0 self-start lg:block xl:col-span-1',
                    NOTICE_BAR_MESSAGE ? 'top-30.5' : 'top-22.5'
                )}
            >
                <TableOfContents headings={post?.headings ?? []} />
            </aside>
        </div>
    );
};

export default PostPage;
