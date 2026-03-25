'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useMemo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DEFAULT_GITHUB_USERNAME } from '@/constants/github-stats';
import { cn } from '@/utils/shadcn';

const GITHUB_STATS_URL = 'https://github-readme-stats.vercel.app/api'; // Github Stats API URL
const TOP_LANGS_ENDPOINT = 'top-langs'; // Github Stats API Top Languages Endpoint
const CARD_PADDING_HEIGHT = 48; // Shadcn Card Padding Height

// 統計卡片類型
type StatsType = 'stats' | 'top-langs';

interface GithubStatsParams {
    [key: string]: string | number | boolean | undefined;
    light_theme?: string;
    dark_theme?: string;
}

/**
 * GitHub 統計卡片元件的屬性介面。
 */
interface GithubStatsCardProps {
    /** 是否使用 Card 容器包裹。 */
    useCard?: boolean;
    /** Card 容器的 CSS 類名。 */
    cardClassName?: string;
    /** Card 內容區域的 CSS 類名。 */
    cardContentClassName?: string;
    /** 圖片容器的 CSS 類名。 */
    imageContainerClassName?: string;
    /** 骨架屏的 CSS 類名。 */
    skeletonClassName?: string;
    /** GitHub 使用者名稱。 */
    username?: string;
    /** 統計圖表類型：'stats' (一般統計) 或 'top-langs' (常用語言)。 */
    type: StatsType;
    /** 額外的 API 參數。 */
    params?: GithubStatsParams;
    /** 圖片寬度。 */
    width?: number;
    /** 圖片高度。 */
    height?: number;
    /** 圖片載入策略。 */
    loading?: 'lazy' | 'eager';
    /** 圖片替代文字。 */
    alt?: string;
}

/**
 * 將參數物件轉換成查詢字串。
 *
 * @param params - 參數物件。
 * @returns 查詢字串。
 */
const buildQueryString = (params: GithubStatsParams): string => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });

    return queryParams.toString();
};

/**
 * 構建完整的 GitHub Stats API URL。
 *
 * @param type - 統計圖表類型。
 * @param username - GitHub 使用者名稱。
 * @param params - API 參數。
 * @param theme - 主題名稱。
 * @returns 完整的 API URL。
 */
const buildStatsUrl = (type: StatsType, username: string, params: GithubStatsParams, theme: string): string => {
    const endpoint = type === 'top-langs' ? TOP_LANGS_ENDPOINT : '';
    const baseUrl = `${GITHUB_STATS_URL}${endpoint ? `/${endpoint}` : ''}`;

    // 準備最終參數，移除主題相關的特殊參數
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { light_theme, dark_theme, ...restParams } = params;
    const finalParams: GithubStatsParams = {
        username,
        theme,
        ...restParams,
    };

    const queryString = buildQueryString(finalParams);
    return `${baseUrl}?${queryString}`;
};

/**
 * 根據主題模式獲取對應的主題參數。
 *
 * @param params - API 參數，可能包含 light_theme 和 dark_theme。
 * @param isDark - 是否為深色模式。
 * @returns 主題名稱。
 */
const getThemeParam = (params: GithubStatsParams, isDark: boolean): string => {
    return isDark ? params.dark_theme || 'dark' : params.light_theme || 'default';
};

/**
 * GitHub 統計卡片元件。
 *
 * 顯示 GitHub 統計資訊或常用語言圖表。
 * 支援深色/淺色模式自動切換，並提供載入中的骨架屏效果。
 *
 * @param props - 元件屬性 {@link GithubStatsCardProps}。
 */
const GithubStatsCard = ({
    useCard = true,
    cardClassName,
    cardContentClassName,
    imageContainerClassName,
    skeletonClassName,
    username = DEFAULT_GITHUB_USERNAME,
    type,
    params = {},
    width = 296,
    height = 190,
    loading = 'lazy',
    alt = 'github stats',
}: GithubStatsCardProps) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 確保元件已掛載
    useEffect(() => {
        const mounted = () => setMounted(true);
        mounted();
    }, []);

    // 計算當前 URL
    const currentUrl = useMemo(() => {
        const isDark = resolvedTheme !== 'light';
        const themeParam = getThemeParam(params, isDark);
        const currentUrl = buildStatsUrl(type, username, params, themeParam);

        return currentUrl;
    }, [type, username, params, resolvedTheme]);

    // 圖片元件
    const ImageComponent = useMemo(
        () => (
            <div className={cn('relative overflow-hidden', imageContainerClassName)} style={{ width, height }}>
                <Image
                    className="object-cover"
                    src={currentUrl}
                    fill
                    loading={loading}
                    alt={alt}
                    priority={loading === 'eager'}
                />
            </div>
        ),
        [imageContainerClassName, width, height, currentUrl, loading, alt]
    );

    // 骨架屏元件
    const SkeletonComponent = useMemo(() => {
        const skeletonHeight = useCard ? height + CARD_PADDING_HEIGHT : height;
        return <Skeleton className={skeletonClassName} style={{ width, height: skeletonHeight }} />;
    }, [skeletonClassName, width, height, useCard]);

    // 在元件掛載前，避免 hydration 不匹配
    if (!mounted) {
        return SkeletonComponent;
    }

    // 返回卡片或圖片元件
    if (useCard) {
        return (
            <Card className={cardClassName}>
                <CardContent className={cn('p-0', cardContentClassName)}>{ImageComponent}</CardContent>
            </Card>
        );
    }

    return ImageComponent;
};

export default GithubStatsCard;
