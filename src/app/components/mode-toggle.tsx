'use client';

import * as React from 'react';
import * as motion from 'motion/react-client';
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
      className="relative inline-flex h-7.5 w-14 items-center rounded-full bg-muted border border-border hover:bg-accent"
      aria-label={`Switch to ${visualDark ? 'light' : 'dark'} mode`}
      style={{
        justifyContent: visualDark ? 'flex-end' : 'flex-start',
        padding: '0.125rem',
      }}
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center"
        layout
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      >
        {visualDark ? (
          <Moon className="h-3 w-3" />
        ) : (
          <Sun className="h-3 w-3" />
        )}
      </motion.div>
    </button>
  );
}
