'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [visualDark, setVisualDark] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && theme) {
      setVisualDark(theme === 'dark');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newIsDark = !visualDark;
    setVisualDark(newIsDark);
    setTheme(newIsDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-7.5 w-14 items-center rounded-full bg-muted border border-border transition-all duration-300 ease-in-out hover:bg-accent"
      aria-label={`Switch to ${visualDark ? 'light' : 'dark'} mode`}
    >
      <span
        className="absolute h-6 w-6 transform rounded-full bg-background border border-border transition-transform duration-300 ease-in-out"
        style={{
          transform: visualDark ? 'translateX(1.75rem)' : 'translateX(0.125rem)',
        }}
      />
      <Sun className={`absolute left-2 h-3 w-3 transition-opacity ${visualDark ? 'opacity-40' : 'opacity-100'}`} />
      <Moon className={`absolute right-2 h-3 w-3 transition-opacity ${visualDark ? 'opacity-100' : 'opacity-40'}`} />
    </button>
  );
}
