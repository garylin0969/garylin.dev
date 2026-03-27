/**
 * 工作經歷列表。
 *
 * 包含各個工作經歷的公司、職稱、時間和詳細內容。
 */
export const EXPERIENCE_LIST = [
    {
        id: 'anue',
        image: '/company-logo/anue.png',
        company: 'Anue 鉅亨網',
        title: 'Frontend Developer',
        startDate: '2024.03',
        endDate: 'Now',
        details: [
            '參與 Scrum 敏捷開發，運用 Jira 與 Confluence 進行跨部門協作，負責外匯及新聞領域逾 10 項專案之迭代與維護。',
            '應用 Next.js SSR 與 Metadata 策略提升網站 SEO 表現，並導入 Lazy Load 機制顯著優化網頁載入速度。',
            '整合 Highcharts 與 TradingView 開發高互動性金融數據圖表，並串接 GA4 分析用戶行為以優化產品體驗。',
            '採取 React Query 快取機制，有效降低 API 請求次數，大幅提升前端運行效率與效能。',
            '運用 React.js、TypeScript、Tailwind CSS 與 Vite 獨立完成 B2B 專案平台開發。',
            '利用 Docker 容器化技術結合 GitLab CI/CD，實現自動化封裝與部署流程。',
        ],
    },
    {
        id: 'uec',
        image: '/company-logo/uec.jpg',
        company: 'Universal EC Inc.',
        title: 'Frontend Developer',
        startDate: '2022.10',
        endDate: '2024.02',
        details: [
            '參與電子發票加值中心、簽審通關共同作業平台及多項基金會系統之全週期開發與前後台整合。',
            '主導系統架構重構，導入 Next.js 升級前台系統並落實元件化設計，有效降低重工成本並提升可維護性。',
            '引入 Jest 測試框架、Prettier 程式碼規範與 JWT 驗證機制，提升程式碼品質與系統安全性。',
            '建構並維護 GitLab CI/CD 自動化部署流程，優化團隊版本控制與交付效率。',
            '運用 React 生態圈（Next.js、TypeScript、Redux）進行前端開發，並熟悉 React Bootstrap 進行 UI 實作。',
            '具備全端協作經驗，使用 Spring Boot 進行後端開發，接觸 MS SQL 與 Oracle 資料庫管理。',
        ],
    },
    // {
    //     id: 'ispan',
    //     image: '/company-logo/ispan.png',
    //     company: 'iSpan International Inc.',
    //     title: 'Frontend Class Trainee',
    //     startDate: '2022.03',
    //     endDate: '2022.08',
    //     details: [
    //         '實施 JSON Web Token (JWT) 與 Google OAuth 認證機制。',
    //         '開發會員中心及收藏功能，提供完善的用戶資料管理與個性化服務，優化用戶體驗。',
    //         '整合 Socket.IO 架構聊天室，實現用戶間即時的通訊互動。',
    //         '採用 Chart.js 構建數據可視化報表，提升資料呈現效果並增強數據分析能力。',
    //         '基於 React.js 搭配 Axios 進行 API 整合，運用 Bootstrap 與 MUI 完成前端設計，並結合 GSAP 強化頁面動畫效果，打造流暢互動介面。',
    //         '採用 Express 框架搭建後端伺服器，並以 MySQL 作為資料庫管理系統。',
    //     ],
    // },
];

/**
 * 工作經歷項目類型定義。
 */
export type ExperienceItem = (typeof EXPERIENCE_LIST)[0];
