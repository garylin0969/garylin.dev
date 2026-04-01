/**
 * 日期格式化工具函數
 * 提供多種日期格式轉換功能
 */

/**
 * 日期格式化選項介面。
 */
export interface DateFormatOptions {
    /** 是否包含時間。 */
    includeTime?: boolean;
    /** 是否使用 24 小時制。 */
    use24Hour?: boolean;
    /** 是否顯示秒數。 */
    showSeconds?: boolean;
    /** 是否顯示毫秒數。 */
    showMilliseconds?: boolean;
    /** 語言環境代碼 (例如：'zh-TW', 'en-US')。 */
    locale?: string;
    /** 時區 (例如：'Asia/Taipei')。 */
    timeZone?: string;
}

/**
 * 將 Date 物件轉換為各種格式的字串。
 *
 * 支援的格式：'iso', 'local', 'relative', 'short', 'long', 'time', 'date', 'datetime', 'custom'。
 * @throws {Error} 如果提供的日期無效。
 */
export const formatDate = (
    date: Date | string | number,
    format:
        | 'iso'
        | 'local'
        | 'relative'
        | 'short'
        | 'long'
        | 'time'
        | 'date'
        | 'datetime'
        | 'custom'
        | string = 'local',
    options: DateFormatOptions = {}
): string => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date provided');
    }

    const {
        includeTime = true,
        use24Hour = false,
        showSeconds = false,
        locale = 'zh-TW',
        timeZone = 'Asia/Taipei',
    } = options;

    switch (format) {
        case 'iso':
            return dateObj.toISOString();

        case 'local':
            return dateObj.toLocaleString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: includeTime ? '2-digit' : undefined,
                minute: includeTime ? '2-digit' : undefined,
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'short':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });

        case 'long':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

        case 'time':
            return dateObj.toLocaleTimeString(locale, {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'date':
            return dateObj.toLocaleDateString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

        case 'datetime':
            return dateObj.toLocaleString(locale, {
                timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: showSeconds ? '2-digit' : undefined,
                hour12: !use24Hour,
            });

        case 'relative':
            return getRelativeTime(dateObj);

        case 'custom':
            return formatCustomDate(dateObj, options);

        default:
            // 處理自定義格式字串
            return formatWithPattern(dateObj, format);
    }
};

/**
 * 獲取相對時間描述（例如：2 小時前、3 天前）。
 *
 */
const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return '剛剛';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}分鐘前`;
    } else if (diffInHours < 24) {
        return `${diffInHours}小時前`;
    } else if (diffInDays < 7) {
        return `${diffInDays}天前`;
    } else if (diffInWeeks < 4) {
        return `${diffInWeeks}週前`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths}個月前`;
    } else {
        return `${diffInYears}年前`;
    }
};

/**
 * 使用自定義選項格式化日期。
 *
 */
const formatCustomDate = (date: Date, options: DateFormatOptions): string => {
    const { locale = 'zh-TW', timeZone = 'Asia/Taipei' } = options;

    return date.toLocaleString(locale, {
        timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
};

/**
 * 使用模式字串格式化日期。
 *
 */
const formatWithPattern = (date: Date, pattern: string): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return pattern
        .replace('YYYY', year.toString())
        .replace('YY', year.toString().slice(-2))
        .replace('MM', month.toString().padStart(2, '0'))
        .replace('M', month.toString())
        .replace('DD', day.toString().padStart(2, '0'))
        .replace('D', day.toString())
        .replace('HH', hours.toString().padStart(2, '0'))
        .replace('H', hours.toString())
        .replace('mm', minutes.toString().padStart(2, '0'))
        .replace('m', minutes.toString())
        .replace('ss', seconds.toString().padStart(2, '0'))
        .replace('s', seconds.toString())
        .replace('SSS', milliseconds.toString().padStart(3, '0'));
};
