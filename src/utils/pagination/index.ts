/**
 * 分頁相關的工具函數
 */

/**
 * 分頁配置介面。
 */
export interface PaginationConfig {
    /** 當前頁碼 (從 1 開始)。 */
    currentPage: number;
    /** 總頁數。 */
    totalPages: number;
    /** 最多顯示的頁碼數量。 */
    maxPagesToShow?: number;
}

/**
 * 分頁狀態介面，包含渲染分頁元件所需的所有資訊。
 */
export interface PaginationState {
    /** 當前頁碼。 */
    currentPage: number;
    /** 總頁數。 */
    totalPages: number;
    /** 是否有下一頁。 */
    hasNextPage: boolean;
    /** 是否有上一頁。 */
    hasPreviousPage: boolean;
    /** 要顯示的頁碼陣列。 */
    pageNumbers: number[];
    /** 是否應該顯示省略號。 */
    shouldShowEllipsis: boolean;
    /** 是否應該顯示第一頁按鈕。 */
    shouldShowFirstPage: boolean;
    /** 是否應該顯示最後一頁按鈕。 */
    shouldShowLastPage: boolean;
    /** 是否應該顯示前面的省略號。 */
    shouldShowFirstEllipsis: boolean;
    /** 是否應該顯示後面的省略號。 */
    shouldShowLastEllipsis: boolean;
}

/**
 * 生成要顯示的頁碼陣列。
 *
 */
export const generatePageNumbers = (currentPage: number, totalPages: number, maxPagesToShow: number = 5): number[] => {
    const pages: number[] = [];

    if (totalPages <= maxPagesToShow) {
        // 如果總頁數不多，顯示所有頁碼
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // 根據當前頁位置決定顯示的頁碼範圍
        if (currentPage <= 3) {
            // 當前頁在前面，顯示前 5 頁
            pages.push(1, 2, 3, 4, 5);
        } else if (currentPage >= totalPages - 2) {
            // 當前頁在後面，顯示後 5 頁
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 當前頁在中間，顯示前後各 2 頁
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
            }
        }
    }

    return pages;
};

/**
 * 計算分頁狀態。
 *
 */
export const calculatePaginationState = (config: PaginationConfig): PaginationState => {
    const { currentPage, totalPages, maxPagesToShow = 5 } = config;

    const pageNumbers = generatePageNumbers(currentPage, totalPages, maxPagesToShow);
    const shouldShowEllipsis = totalPages > maxPagesToShow;

    return {
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
        pageNumbers,
        shouldShowEllipsis,
        shouldShowFirstPage: currentPage > 3 && shouldShowEllipsis,
        shouldShowLastPage: currentPage < totalPages - 2 && shouldShowEllipsis,
        shouldShowFirstEllipsis: currentPage > 4,
        shouldShowLastEllipsis: currentPage < totalPages - 3,
    };
};

/**
 * 驗證頁碼是否有效。
 *
 */
export const validatePageNumber = (page: string | number): number | null => {
    const pageNumber = typeof page === 'string' ? Number(page) : page;

    if (isNaN(pageNumber) || pageNumber < 1) {
        return null;
    }

    return pageNumber;
};
