/**
 * 社交媒體連結配置。
 *
 * 這裡只保留可序列化的純資料，例如網址、label、icon key。
 * 實際 icon component 交給 render 層處理，避免常數檔直接耦合 view 元件。
 */
export const SOCIAL_LINKS = [
    {
        href: 'https://www.linkedin.com/in/garylin0969',
        target: '_blank',
        icon: 'linkedin',
        label: 'LinkedIn',
    },
    {
        href: 'https://www.facebook.com/profile.php?id=100009915255579&mibextid=ZbWKwL',
        target: '_blank',
        icon: 'facebook',
        label: 'Facebook',
    },
    {
        href: 'https://github.com/garylin0969',
        target: '_blank',
        icon: 'github',
        label: 'GitHub',
    },
] as const;
