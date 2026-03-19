import Link from 'next/link';
import AuthorCard from '@/components/molecules/author-card';
import BlogPostCard from '@/components/molecules/blog-post-card';
import IntroCard from '@/components/molecules/intro-card';
import ProjectCard from '@/components/molecules/project-card';
import { Button } from '@/components/ui/button';
import { HOME_INTRO_LIST } from '@/constants/intro';
import { PROJECT_LIST } from '@/constants/project';
import { getLatestPosts } from '@/utils/post';
import { cn } from '@/utils/shadcn';

const latestPosts = getLatestPosts(1);

/**
 * 首頁元件。
 *
 * 顯示網站的首頁內容，包含作者介紹、最新專案和最新文章。
 */
const HomePage = () => {
    return (
        <div className="grid flex-1 place-content-center">
            <div className="mx-auto max-w-6xl space-y-4 md:space-y-8">
                <section className="space-y-4 md:space-y-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex justify-center">
                            {/* 作者卡片 */}
                            <AuthorCard />
                        </div>
                        <div className="hidden md:flex md:justify-center">
                            {/* 最新專案卡片 */}
                            <ProjectCard
                                className="w-74"
                                imageLoading="eager"
                                badge="New Project"
                                maxVisible={4}
                                project={PROJECT_LIST[0]}
                            />
                        </div>
                    </div>
                    {/* 簡短介紹卡片 */}
                    <IntroCard
                        className="mx-auto max-w-3xl"
                        list={HOME_INTRO_LIST}
                        listClassName="text-center text-xl"
                    />
                </section>
                {/* 最新文章 */}
                <section className="flex flex-1 flex-col items-center justify-center gap-y-2">
                    <div>
                        {latestPosts?.map((post) => (
                            <BlogPostCard
                                key={post?.slug}
                                className={cn(latestPosts?.length > 1 && 'border-b')}
                                post={post}
                            />
                        ))}
                    </div>
                    <Link href="/blog/all/1">
                        <Button variant="outline">View All</Button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
