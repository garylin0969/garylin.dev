import HomeHero from '@/components/molecules/home-hero';
import MDXContent from '@/components/molecules/mdx-content';
import SocialLinks from '@/components/molecules/social-links';
import { getHomePagePost } from '@/utils/home';

/**
 * 首頁元件。
 *
 * 顯示網站的首頁內容，包含 Hero 區塊與 MDX 內文。
 */
const HomePage = () => {
    // 取得首頁內容
    const homePagePost = getHomePagePost();

    if (!homePagePost) {
        return (
            <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl items-center justify-center px-6 py-16">
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-semibold">Home content not found</h1>
                    <p className="text-muted-foreground">Please add `content/home/index.mdx` and rebuild Velite.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6">
            {/* Hero 區塊 */}
            <HomeHero title={homePagePost?.title} description={homePagePost?.description} />
            {/* MDX 內文 */}
            <section className="prose prose-figcaption:mt-0 prose-figure:m-0 dark:prose-invert max-w-none">
                <MDXContent code={homePagePost?.code} />
            </section>
            {/* 社交連結 */}
            <div>
                <p className="mb-4">Find me on</p>
                <SocialLinks />
            </div>
        </div>
    );
};

export default HomePage;
