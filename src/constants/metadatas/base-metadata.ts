import type { Metadata, Viewport } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 基礎元數據配置。
 *
 * 定義網站的全域預設元數據，包含標題模板、描述、關鍵字、作者、OpenGraph 和 Twitter 卡片設定。
 */
export const baseMetadata: Metadata = {
    title: {
        default: 'Gary Lin',
        template: '%s | Gary Lin',
    },
    description: '嗨，我是 Gary Lin，專精於 React.js、Next.js 和現代網頁技術的前端工程師。',
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
        description: '嗨，我是 Gary Lin，專精於 React.js、Next.js 和現代網頁技術的前端工程師。',
        url: DOMAIN,
        siteName: 'Gary Lin',
        locale: 'zh_TW',
        type: 'website',
        images: [
            {
                url: '/favicons/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Gary Lin',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gary Lin',
        description: '嗨，我是 Gary Lin，專精於 React.js、Next.js 和現代網頁技術的前端工程師。',
        images: ['/favicons/android-chrome-512x512.png'],
        creator: '@garylin_dev',
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
