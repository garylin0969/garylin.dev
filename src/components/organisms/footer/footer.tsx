import { FOOTER_CONFIG } from '@/constants/footer';

/**
 * 網站頁尾元件。
 *
 * 顯示版權資訊、作者連結和相關年份。
 */
const Footer = () => {
    return (
        <footer className="py-4 text-center text-sm tracking-wide">
            <p>
                {FOOTER_CONFIG.startYear} - PRESENT &copy;{' '}
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
            </p>
        </footer>
    );
};

export default Footer;
