import { home } from '@velite';
import MDXContent from '@/components/molecules/mdx-content';

/**
 * 首頁元件。
 *
 * 顯示網站的首頁內容。
 */
const HomePage = () => {
    const homePage = home[0];

    if (!homePage) {
        return (
            <main className="mx-auto flex min-h-[50vh] w-full max-w-3xl items-center justify-center px-6 py-16">
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-semibold">Home content not found</h1>
                    <p className="text-muted-foreground">Please add `content/home/index.mdx` and rebuild Velite.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
            <section className="space-y-4">
                <p className="text-muted-foreground text-sm font-medium tracking-[0.3em] uppercase">Home</p>
                <div className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{homePage.title}</h1>
                    <p className="text-muted-foreground text-lg">{homePage.description}</p>
                </div>
            </section>

            {homePage.intro.length > 0 && (
                <section className="space-y-3 rounded-2xl border px-5 py-4">
                    {homePage.intro.map((item) => (
                        <p key={item} className="text-base font-medium sm:text-lg">
                            {item}
                        </p>
                    ))}
                </section>
            )}

            <section className="prose prose-figcaption:mt-0 prose-figure:m-0 dark:prose-invert max-w-none">
                <MDXContent code={homePage.code} />
            </section>
        </main>
    );
};

export default HomePage;
