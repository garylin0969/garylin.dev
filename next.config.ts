import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    // 啟用 Cache Components
    cacheComponents: false,
    logging: {
        browserToTerminal: true,
        // 'error' — errors only (default)
        // 'warn'  — warnings and errors
        // true    — all console output
        // false   — disabled
    },
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
