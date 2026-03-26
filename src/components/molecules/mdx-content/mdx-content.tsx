/* eslint-disable @typescript-eslint/no-explicit-any */
import * as runtime from 'react/jsx-runtime';
import { ComponentType, useMemo } from 'react';
import DocsHeading from '@/components/atoms/docs-heading';
import CodeBlock from '@/components/molecules/code-block';
import { Badge } from '@/components/ui/badge';

/**
 * 從 MDX 子元素中提取程式碼區塊的屬性。
 *
 * @param children - MDX 子元素。
 * @returns 包含標題、語言和複製內容的物件。
 */
const extractCodeBlockProps = (children: any) => {
    const hasTitle = Array.isArray(children); // 判斷是否有標題
    const title = hasTitle ? (children?.[0]?.props?.children ?? '') : ''; // 如果有標題，則取標題
    // 如果有標題，則取標題的data-language屬性，否則取程式碼片段的data-language屬性
    const language = hasTitle
        ? (children?.[0]?.props?.['data-language'] ?? '')
        : (children?.props?.['data-language'] ?? '');
    // 如果有標題，則取標題的rawcontent屬性，否則取程式碼片段的rawcontent屬性
    const copyContent = hasTitle ? (children?.[1]?.props?.rawcontent ?? '') : (children?.props?.rawcontent ?? '');

    // 返回標題、語言和複製內容
    return { title, language, copyContent };
};

/**
 * 自定義的 MDX 元件映射表。
 *
 * 定義了如何在 MDX 中渲染各種 HTML 元素，例如標題、程式碼區塊等。
 */
const sharedComponents: Record<string, ComponentType<any>> = {
    h1: ({ children, ...props }) => {
        return <DocsHeading as="h1" title={children} {...props} />;
    },
    h2: ({ children, ...props }) => {
        return <DocsHeading as="h2" title={children} {...props} />;
    },
    h3: ({ children, ...props }) => {
        return <DocsHeading as="h3" title={children} {...props} />;
    },
    h4: ({ children, ...props }) => {
        return <DocsHeading as="h4" title={children} {...props} />;
    },
    h5: ({ children, ...props }) => {
        return <DocsHeading as="h5" title={children} {...props} />;
    },
    h6: ({ children, ...props }) => {
        return <DocsHeading as="h6" title={children} {...props} />;
    },

    figure: ({ children, ...props }) => {
        const { title, language, copyContent } = extractCodeBlockProps(children);

        return (
            <CodeBlock title={title} language={language} copyContent={copyContent} {...props}>
                {children}
            </CodeBlock>
        );
    },

    figcaption: () => null,

    code: ({ children, ...props }) => {
        // 判斷是否為行內說明文字
        const isInline = typeof children === 'string';

        if (isInline) {
            return (
                <Badge className="rounded-md px-2 py-1" variant="secondary" {...props}>
                    {children}
                </Badge>
            );
        }

        return <code {...props}>{children}</code>;
    },
};

/**
 * 將 Velite 生成的 MDX 代碼解析為 React 元件。
 *
 * @param code - MDX 代碼字串。
 * @returns React 元件。
 */
const mdxCache = new Map<string, ComponentType<any>>();

/**
 * 將 Velite 生成的 MDX 代碼解析為 React 元件。
 * 加入全域 Cache 避免 React 19 嚴格模式下報錯 "Cannot create components during render"
 *
 * @param code - MDX 代碼字串。
 * @returns React 元件。
 */
const getMDXComponent = (code: string) => {
    // 1. 如果已經解析過這個字串，直接拿快取裡的 Component 給它
    if (mdxCache.has(code)) {
        return mdxCache.get(code)!;
    }
    // 2. 透過 new Function() 動態執行 code 字串，並把 runtime 傳進去
    const fn = new Function(code);
    // 3. 執行後會得到一個物件，取 .default 就是 React Component
    const Component = fn({ ...runtime }).default;
    // 4. 存進快取
    mdxCache.set(code, Component);
    return Component;
};

interface MDXProps {
    code: string;
    components?: Record<string, ComponentType>;
    [key: string]: any;
}

/**
 * MDX 內容渲染元件。
 *
 * 用於渲染由 Velite 處理後的 MDX 內容，並注入自定義元件。
 *
 * @param code - MDX 代碼字串 {@link MDXProps.code}。
 * @param components - 自定義元件映射表 {@link MDXProps.components}。
 */
const MDXContent = ({ code, components, ...props }: MDXProps) => {
    const Component = useMemo(() => getMDXComponent(code), [code]);
    // eslint-disable-next-line
    return <Component components={{ ...sharedComponents, ...components }} {...props} />;
};

export default MDXContent;
