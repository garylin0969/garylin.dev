'use client';

import { Copy, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/shadcn';

/**
 * 複製按鈕元件的屬性介面。
 */
interface CopyButtonProps {
    /** 額外的 CSS 類名。 */
    className?: string;
    /** 要複製的內容。 */
    content?: string;
}

/**
 * 複製按鈕元件。
 *
 * 點擊後將指定內容複製到剪貼簿，並顯示複製成功的狀態圖示。
 * 狀態圖示會在 1.5 秒後自動恢復。
 *
 */
const CopyButton = ({ className, content }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);
    let timeout: NodeJS.Timeout;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content ?? '');
            setCopied(true);
            timeout = setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error('copy failed:', error);
        }
    };

    useEffect(() => {
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            type="button"
            className={cn('flex items-center justify-center p-1.5', className)}
            title={copied ? 'copied' : 'copy'}
            onClick={handleCopy}
        >
            {copied ? (
                <>
                    <Check size={14} />
                    <span className="sr-only">copied</span>
                </>
            ) : (
                <>
                    <Copy size={14} />
                    <span className="sr-only">copy</span>
                </>
            )}
        </button>
    );
};

export default CopyButton;
