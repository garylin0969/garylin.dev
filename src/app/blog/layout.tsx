import { ReactNode } from 'react';

/**
 * 部落格佈局元件的屬性介面。
 */
interface BlogLayoutProps {
    /** 子元件 (頁面內容)。 */
    children: ReactNode;
}

/**
 * 部落格佈局元件。
 *
 * 定義部落格頁面的結構，包含側邊欄 (作者、統計、分類) 和主要內容區域。
 *
 * @param children - 子元件 {@link BlogLayoutProps.children}。
 */
const BlogLayout = ({ children }: BlogLayoutProps) => {
    return (
        // <div className="container flex flex-col lg:flex-row">
        //     <aside className="hidden w-74 space-y-4 lg:block">
        //         {/* 作者 */}
        //         <AuthorCard />
        //         {/* 文章統計 */}
        //         <BlogStatsCard />
        //         {/* 文章分類 */}
        //         <BlogCategoriesCard />
        //     </aside>
        //     <div className="flex-1">{children}</div>
        // </div>
        <div className="container">{children}</div>
    );
};

export default BlogLayout;
