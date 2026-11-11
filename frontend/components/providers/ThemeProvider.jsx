"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Always render the provider: swapping it in after mount remounted the whole app
// (double fetches, lost state, dropped in-flight navigations). <html suppressHydrationWarning>
// in app/layout.js covers the class next-themes sets before hydration.
export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
}
