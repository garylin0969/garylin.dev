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
            '參與 Scrum 敏捷開發流程，主導外匯與新聞領域約 10 項專案的功能迭代與維護，並運用 Jira、Slack 與 Confluence 促進跨部門協作與專案管理。',
            '結合 Next.js 伺服端渲染 (SSR) 與 Metadata 策略優化網站 SEO 表現；同時採用 React Query 快取與 Lazy Load 機制，減少 API 呼叫次數，大幅提升網頁效能與載入速度。',
            '串接 Highcharts 與 TradingView 開發高互動性的動態視覺化圖表，提供金融數據呈現；並透過 Google Analytics (GA4) 收集分析用戶行為數據，產出深度洞察報告。',
            '運用 React.js、TypeScript、Tailwind CSS 及 Vite 開發 B2B 專案平台，並使用 Jest 與 Storybook 確保程式碼可維護性與元件庫穩定性。',
            '採用 Docker 封裝網站服務為映像檔，並結合 GitLab CI/CD 流程自動化部署至 GitLab Container Registry，有效縮短交付時間並提升上線穩定性。',
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
            '參參與 Scrum 敏捷開發流程，運用 Mantis 與 Asana 促進跨部門協作，主導簽審通關共同作業平台前後台整合，並支援電子發票中心、純青及第一社福基金會等多個系統的全週期開發。',
            '重構既有專案與模板系統架構，全面推動元件化設計以有效降低重工成本，並導入 Prettier、JWT 與 Jest 等技術規範，顯著提升程式碼品質與系統整體穩定性。',
            '深入應用 Next.js 與 React.js 技術堆疊（涵蓋 TypeScript、Redux、React Hook Form 等）推動前台系統升級與新功能開發，並利用 React Bootstrap 確保前端 UI 視覺一致性。',
            '使用 Spring Boot 協助後端服務開發，並運用 MS SQL 與 Oracle 執行資料庫管理，確保前後端系統的整合與協同運作。',
            '建構 GitLab CI/CD 自動化部署流程，並透過 Sourcetree、GitLab 與 Apache 控管版本與上線排程，大幅提升軟體交付效率與部署穩定性。',
        ],
    },
    // {
    // id: 'ispan',
    // image: '/company-logo/ispan.png',
    // company: 'iSpan International Inc.',
    // title: 'Frontend Class Trainee',
    // startDate: '2022.03',
    // endDate: '2022.08',
    // details: [
    // '實施 JSON Web Token (JWT) 與 Google OAuth 認證機制。',
    // '開發會員中心及收藏功能，提供完善的用戶資料管理與個性化服務，優化用戶體驗。',
    // '整合 Socket.IO 架構聊天室，實現用戶間即時的通訊互動。',
    // '採用 Chart.js 構建數據可視化報表，提升資料呈現效果並增強數據分析能力。',
    // '基於 React.js 搭配 Axios 進行 API 整合，運用 Bootstrap 與 MUI 完成前端設計，並結合 GSAP 強化頁面動畫效果，打造流暢互動介面。',
    // '採用 Express 框架搭建後端伺服器，並以 MySQL 作為資料庫管理系統。',
    // ],
    // },
];

/**
 * 工作經歷項目類型定義。
 */
export type ExperienceItem = (typeof EXPERIENCE_LIST)[0];
