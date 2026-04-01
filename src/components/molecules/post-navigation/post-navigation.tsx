import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

/** 單筆文章導覽連結資料 */
interface PostLinkData {
    /** 文章標題 */
    title: string;
    /** 文章永久連結 */
    permalink: string;
}

/** 文章導覽列屬性 */
interface PostNavigationProps {
    /** 上一篇文章（較新） */
    previousPost?: PostLinkData;
    /** 下一篇文章（較舊） */
    nextPost?: PostLinkData;
}

/**
 * 文章導覽列元件
 *
 * 用於在文章詳情頁底部顯示「上一篇」與「下一篇」的連結。
 *
 * @param props - 導覽列屬性 {@link PostNavigationProps}
 */
const PostNavigation = ({ previousPost, nextPost }: PostNavigationProps) => {
    // 若沒有上一篇及下一篇，則不顯示導覽列
    if (!previousPost && !nextPost) {
        return null;
    }

    return (
        <nav aria-label="Post navigation" className="grid grid-cols-2 items-start gap-x-2">
            {/* 上一篇（左側） */}
            <div className="col-span-1">
                {previousPost && (
                    <Link href={previousPost.permalink} className="group hover:opacity-75">
                        <div className="flex items-center justify-start gap-x-1 font-semibold">
                            <ChevronLeftIcon />
                            <span>Previous Post</span>
                        </div>
                        <div
                            className="text-muted-foreground group-hover:text-foreground line-clamp-1 pl-7 text-start text-sm transition-colors"
                            title={previousPost.title}
                        >
                            {previousPost.title}
                        </div>
                    </Link>
                )}
            </div>
            {/* 下一篇（右側） */}
            <div className="col-span-1">
                {nextPost && (
                    <Link href={nextPost.permalink} className="group hover:opacity-75">
                        <div className="flex items-center justify-end gap-x-1 font-semibold">
                            <span>Next Post</span>
                            <ChevronRightIcon />
                        </div>
                        <div
                            className="text-muted-foreground group-hover:text-foreground line-clamp-1 pr-7 text-end text-sm transition-colors"
                            title={nextPost.title}
                        >
                            {nextPost.title}
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default PostNavigation;
