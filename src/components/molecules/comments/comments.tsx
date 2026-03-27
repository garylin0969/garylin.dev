'use client';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// 動態導入 Giscus
const Giscus = dynamic(() => import('@giscus/react'), {
    ssr: false, // 禁用 SSR
});

/**
 * 評論區元件。
 *
 * 使用 Giscus 載入 GitHub Discussions 作為評論系統。
 * 會根據當前主題自動切換 Giscus 的主題。
 */
const Comments = () => {
    const { resolvedTheme } = useTheme();

    return (
        <Giscus
            repo="garylin0969/blog"
            repoId="R_kgDONFDN5Q"
            category="General"
            categoryId="DIC_kwDONFDN5c4CnIE8"
            mapping="og:title"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={resolvedTheme === 'dark' ? 'dark_tritanopia' : 'light_tritanopia'}
            lang="zh-TW"
            loading="lazy"
        />
    );
};

export default Comments;
