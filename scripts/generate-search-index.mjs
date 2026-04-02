import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 這支腳本會在 dev / build 前執行，
// 把 Velite 產生的文章資料整理成給前端搜尋使用的輕量索引。
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const velitePostsPath = path.join(rootDir, '.velite', 'posts.json');
const outputPath = path.join(rootDir, 'public', 'search-index.json');

const rawPosts = await readFile(velitePostsPath, 'utf8');
const posts = JSON.parse(rawPosts);

const searchIndex = posts
    // 搜尋索引只保留已發布文章，避免草稿內容進入前台資源。
    .filter((post) => !post?.draft)
    .map((post) => ({
        slug: post.slug,
        permalink: post.permalink,
        title: post.title,
        description: post.description ?? '',
        category: post.category ?? '',
        tags: post.tags ?? [],
        headings: post.headings?.map((heading) => heading?.text).filter(Boolean) ?? [],
        // 建置時先把所有可搜尋內容組成單一小寫字串，
        // 讓前端搜尋時只做一次 `includes`，減少每次輸入時的重複運算。
        searchableText: [
            post.title,
            post.description ?? '',
            post.category ?? '',
            ...(post.tags ?? []),
            ...(post.headings?.map((heading) => heading?.text).filter(Boolean) ?? []),
        ]
            .join(' ')
            .toLowerCase(),
    }));

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(searchIndex, null, 2)}\n`, 'utf8');
