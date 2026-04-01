import { notFound } from 'next/navigation';
import Comments from '@/components/molecules/comments';
import MDXContent from '@/components/molecules/mdx-content';
import MobileTableOfContents from '@/components/molecules/mobile-table-of-contents';
import TableOfContents from '@/components/molecules/table-of-contents';
import BlogPostHeader from '@/components/organisms/blog-post-header';
import { generatePostMetadata, generatePostNotFoundMetadata } from '@/constants/metadatas';
import { NOTICE_BAR_MESSAGE } from '@/constants/site';
import { getPostBySlug, getPublishedPosts } from '@/utils/post';
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
 * @returns 靜態參數陣列。
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
 * @param props - 頁面屬性 {@link PostPageProps}。
 * @returns 頁面元數據物件。
 */
export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return generatePostNotFoundMetadata();
    }

    return generatePostMetadata(post);
}

/**
 * 文章詳情頁面。
 *
 * 顯示文章的完整內容，包含標題、元數據、標籤、目錄、MDX 內容和評論區。
 *
 * @param params - 路由參數 {@link PostPageProps.params}。
 */
const PostPage = async ({ params }: PostPageProps) => {
    const { slug } = await params;

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-4">
            {/* 文章 */}
            <article className="col-span-4 lg:px-8 xl:col-span-3">
                {/* 標題與元數據 */}
                <BlogPostHeader
                    className="mb-4"
                    title={post?.title}
                    createdAt={post?.createdAt}
                    category={post?.category}
                    tags={post?.tags ?? []}
                />
                {/* 行動版目錄 */}
                <MobileTableOfContents className="mb-4 xl:hidden" headings={post?.headings ?? []} />
                {/* MDX 內容 */}
                <div className="prose prose-figcaption:mt-0 prose-figure:m-0 dark:prose-invert max-w-none">
                    <MDXContent code={post?.code} />
                </div>
                {/* 評論 */}
                <div className="mt-10">
                    <Comments />
                </div>
            </article>
            {/* 目錄 */}
            <aside
                className={cn(
                    'sticky hidden shrink-0 self-start xl:col-span-1 xl:block',
                    NOTICE_BAR_MESSAGE ? 'top-30.5' : 'top-22.5'
                )}
            >
                <TableOfContents headings={post?.headings ?? []} />
            </aside>
        </div>
    );
};

export default PostPage;
