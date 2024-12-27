'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { useEffect, useState } from 'react'

export function NextThemeProvider({ children }: { children: ReactNode }) {
    const [isMount, setMount] = useState(false);

    useEffect(() => {
        setMount(true)
    }, [])

    if (!isMount) {
        return null
    }

    return (
        <ThemeProvider attribute="class" defaultTheme={"system"} enableSystem={true}>
            {children}
        </ThemeProvider>
    );
}
