"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>{children}</ThemeProvider>
    </NextUIProvider>
  );
}
