'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { themeAtom } from './state';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
}
