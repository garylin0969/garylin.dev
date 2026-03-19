import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import { baseMetadata, viewport } from '@/constants/metadatas';
import { GA_ID } from '@/constants/site';
import { ThemeProvider } from '@/providers';
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
 * @param children - 子元件 (頁面內容)。
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
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="container mx-auto my-8 flex flex-1 flex-col px-4">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
                <GoogleAnalytics gaId={GA_ID} />
            </body>
        </html>
    );
}
