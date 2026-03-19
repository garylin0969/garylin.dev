import { FOOTER_CONFIG } from '@/constants/footer';

const currentYear = new Date().getFullYear();

/**
 * 網站頁尾元件。
 *
 * 顯示版權資訊、作者連結和相關年份。
 * 年份會根據當前時間自動更新。
 */
const Footer = () => {
    return (
        <footer className="py-4 text-center text-sm tracking-wide">
            <p>
                &copy;{' '}
                {FOOTER_CONFIG.startYear === currentYear ? currentYear : `${FOOTER_CONFIG.startYear}-${currentYear}`}
                <span className="mx-1">
                    <a
                        className="hover:text-primary"
                        href={FOOTER_CONFIG.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {FOOTER_CONFIG.linkTitle}
                    </a>
                </span>
                {FOOTER_CONFIG.copyright}
            </p>
        </footer>
    );
};

export default Footer;
