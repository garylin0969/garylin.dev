import { MetadataRoute } from 'next';
import { DOMAIN } from '@/constants/site';

/**
 * 生成 robots.txt 文件配置。
 *
 * 定義搜尋引擎爬蟲的訪問規則和 sitemap 位置。
 *
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${DOMAIN}/sitemap.xml`,
    };
}
