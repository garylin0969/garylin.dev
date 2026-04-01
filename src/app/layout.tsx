import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import CommandSearchDialog from '@/components/molecules/command-search-dialog/command-search-dialog';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { baseMetadata, viewport } from '@/constants/metadatas';
import { GA_ID } from '@/constants/site';
import { CommandSearchProvider, ThemeProvider } from '@/providers';
import { cn } from '@/utils/shadcn';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
});

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = baseMetadata;

export { viewport };

/**
 * 根佈局元件。
 *
 * 定義應用程式的全域結構，包含 HTML、Body、字型、主題提供者、頁首、頁尾和 Google Analytics。
 *
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="zh-TW" suppressHydrationWarning>
            <body className={cn(inter.className, geistSans.variable, geistMono.variable, 'antialiased')}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <CommandSearchProvider>
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <main className="container mx-auto my-8 flex flex-1 flex-col px-4">{children}</main>
                            <Footer />
                            {/*
                             * 搜尋對話框放在 layout 的原因：
                             * 1. 桌機版 Header 與手機版選單都會顯示搜尋入口
                             * 2. 兩邊應該共用同一份搜尋狀態與同一個 dialog 實例
                             * 3. 避免不同入口各自 render 一份 CommandSearch，造成重複掛載與重複資料載入
                             */}
                            <CommandSearchDialog />
                        </div>
                    </CommandSearchProvider>
                </ThemeProvider>
                <GoogleAnalytics gaId={GA_ID} />
            </body>
        </html>
    );
}
