import type { Metadata, Viewport } from 'next';
import { DEFAULT_OPEN_GRAPH_IMAGE, DOMAIN } from '@/constants/site';

const baseDescription =
    "Hi, I'm Gary Lin, a frontend developer specializing in React.js, Next.js, and modern web technologies.";

/**
 * 基礎元數據配置。
 *
 * 定義網站的全域預設元數據，包含標題模板、描述、關鍵字、作者、OpenGraph 和 Twitter 卡片設定。
 */
export const baseMetadata: Metadata = {
    title: {
        default: 'Gary Lin',
        template: '%s - Gary Lin',
    },
    description: baseDescription,
    keywords: [
        'Gary Lin',
        'Frontend Developer',
        'Web Development',
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        '前端',
        '前端開發',
        '前端開發者',
        '前端工程師',
        '前端開發人員',
        '網頁開發',
        'Blog',
        '技術部落格',
    ],
    authors: [{ name: 'Gary Lin' }],
    creator: 'Gary Lin',
    publisher: 'Gary Lin',
    metadataBase: new URL(DOMAIN),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Gary Lin',
        description: baseDescription,
        url: DOMAIN,
        siteName: 'Gary Lin',
        locale: 'zh_TW',
        type: 'website',
        images: [
            {
                url: DEFAULT_OPEN_GRAPH_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Gary Lin',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gary Lin',
        description: baseDescription,
        images: [DEFAULT_OPEN_GRAPH_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            {
                rel: 'icon',
                url: '/favicons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                rel: 'icon',
                url: '/favicons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    },
    manifest: '/favicons/site.webmanifest',
    category: 'technology',
    referrer: 'origin-when-cross-origin',
    generator: 'Next.js',
    applicationName: 'Gary Lin',
    appleWebApp: {
        title: 'Gary Lin',
        statusBarStyle: 'default',
        capable: true,
    },
};

/**
 * 視口配置。
 *
 * 定義網站的視口設定，包含寬度、縮放比例和主題顏色。
 */
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
    colorScheme: 'light dark',
};
