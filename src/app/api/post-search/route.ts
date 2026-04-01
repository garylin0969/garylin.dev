import { getPublishedPosts } from '@/utils/post';

export async function GET() {
    // 搜尋只需要 slug、標題、描述、分類、標籤與 heading 文字。
    // 這裡故意不回傳完整 post object，避免把 MDX code、額外 metadata
    // 或其他前端搜尋不需要的欄位送進瀏覽器端。
    const posts = getPublishedPosts().map((post) => ({
        slug: post.slug,
        permalink: post.permalink,
        title: post.title,
        description: post.description,
        category: post.category,
        tags: post.tags ?? [],
        headings: post.headings?.map((heading) => heading?.text).filter(Boolean) ?? [],
    }));

    return Response.json(posts);
}
