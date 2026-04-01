---
trigger: always_on
description: Activated when writing, refactoring, or explaining TypeScript/JavaScript code. Enforces Google Style Traditional Chinese JSDoc comments on all exported functions, classes, interfaces, and components.
---

# JSDoc Convention (Google Style)

To ensure code readability and IDE support, all exported code entities must follow the JSDoc specification from the Google JavaScript Style Guide. All descriptive text must be written in **Traditional Chinese (Taiwan)**.

> 📚 **Reference**: [Google JavaScript Style Guide - JSDoc](https://google.github.io/styleguide/jsguide.html#jsdoc)

## 1. Core Principles

- **Language**: All descriptive text must be in **Traditional Chinese** (Taiwan conventions).
- **Format**: Must use `/** ... */` multi-line comment format.
- **Timing**: A JSDoc comment must be placed before any `export`ed Function, Component, Interface, Type, or Class.

## 2. Examples

### A. Functions & Utilities

The first line should be a brief summary. If detailed explanation is needed, add a blank line before it.

```typescript
/**
 * 計算購物車的總金額，並包含稅率運算。
 *
 * 此函式會自動過濾掉無效的商品項目，並應用當前的優惠券折扣。
 */
export const calculateTotal = (items: CartItem[], taxRate: number = 0.05, couponCode?: string): number => {
    // ...
};
```

### B. React Components

Must clearly describe the component's responsibility.

```tsx
/**
 * 使用者個人資料卡片元件。
 *
 * 負責顯示使用者的頭像、名稱以及簡介。
 * 點擊卡片時會觸發導航至使用者詳情頁面。
 */
const UserProfileCard = ({ userId, name, avatarUrl, onClick }: UserProfileCardProps) => {
    // ...
};

export default UserProfileCard;
```

### C. Interfaces & Types

Each property should have a single-line description above it.

```typescript
/**
 * 定義 API 回傳的標準錯誤格式
 */
interface ApiErrorResponse {
    /** 錯誤代碼 (如: 404, 500) */
    code: number;
    /** 給使用者看的錯誤訊息 (繁體中文) */
    message: string;
    /** 除錯用的詳細堆疊資訊 (僅在開發環境回傳) */
    stack?: string;
}
```

## 3. Execution Checklist

After generating code, verify:

- [ ] Is the JSDoc comment directly above the code it documents?
- [ ] Is the descriptive text fluent and in Traditional Chinese?
