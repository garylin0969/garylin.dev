'use client';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { GISCUS_CONFIG, GISCUS_DARK_THEME, GISCUS_LIGHT_THEME } from '@/constants/giscus';

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
            {...GISCUS_CONFIG}
            theme={resolvedTheme === 'dark' ? GISCUS_DARK_THEME : GISCUS_LIGHT_THEME}
        />
    );
};

export default Comments;
