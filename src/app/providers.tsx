'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
