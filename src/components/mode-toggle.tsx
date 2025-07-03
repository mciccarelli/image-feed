'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="default" 
          size="sm"
          className="h-8 w-8 p-0 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white dark:text-black" />
          <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white dark:text-black" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-black border-gray-200 dark:border-gray-800">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 text-xs"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 text-xs"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 text-xs"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
