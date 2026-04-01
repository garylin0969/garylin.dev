'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { ComponentProps } from 'react';

/**
 * 主題提供者元件的屬性介面。
 */
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * 主題提供者元件。
 *
 * 封裝 next-themes 的 ThemeProvider，用於管理應用程式的主題（深色/淺色模式）。
 *
 */
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
