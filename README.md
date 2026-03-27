# garylin.dev

https://garylin.dev

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Google Analytics
- Velite
- GitHub Actions for CI/CD

## Deployment

- Vercel

## Domain

- GoDaddy

## 版本管理策略

### 分支使用規則

- **main branch**: 主要生產分支，包含穩定版本
- **dev branch**: 開發分支，用於日常修改和新增文章

### 工作流程

1. **日常修改**: 直接在 `dev` 分支進行修改
2. **文章新增**: 在 `dev` 分支新增文章內容
3. **合併流程**: `dev` → `main`
4. **版本標籤**: 每次合併到 main 後新增對應的 tag

### 標籤管理

- 每次從 dev 合併到 main 時都會新增對應的版本標籤
- 標籤格式遵循語義化版本控制 (Semantic Versioning)
