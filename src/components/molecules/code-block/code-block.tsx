import { ReactNode } from 'react';
import { CopyButton } from '@/components/atoms/copy-button';

/**
 * 程式碼區塊元件的屬性介面。
 */
interface CodeBlockProps {
    /** 程式碼區塊標題 (通常是檔案名稱)。 */
    title?: string;
    /** 程式語言名稱。 */
    language?: string;
    /** 要複製的程式碼內容。 */
    copyContent?: string;
    /** 子元素 (通常是語法高亮後的程式碼)。 */
    children: ReactNode;
}

/**
 * 程式碼區塊元件。
 *
 * 用於顯示程式碼片段，包含標題、語言標籤和複製按鈕。
 *
 */
const CodeBlock = ({ title = '', language = '', copyContent = '', children }: CodeBlockProps) => {
    return (
        <div className="my-4 overflow-hidden rounded-xs border border-[#ffffff4d] bg-[#282c34]">
            <figcaption className="flex h-11.25 items-center justify-between border-b border-[#ffffff4d] px-3 py-1">
                <span className="text-sm text-[#a1a1a1]">{title}</span>
                <div className="flex items-center gap-x-2">
                    <span className="text-sm text-[#a1a1a1]">{language}</span>
                    <CopyButton className="text-[#a1a1a1]" content={copyContent} />
                </div>
            </figcaption>
            <figure>{children}</figure>
        </div>
    );
};

export default CodeBlock;
