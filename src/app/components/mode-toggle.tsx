'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Theme</span>
      
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'light' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => setTheme('system')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'system' 
              ? 'bg-accent text-accent-foreground' 
              : 'hover:bg-accent hover:text-accent-foreground'
          }`}
          aria-label="System mode"
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
