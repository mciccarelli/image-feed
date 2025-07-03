'use client';

import { useState } from 'react';
import { Menu, Home, Bookmark, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { GridSizeToggle } from './grid-size-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden bg-background border-b border-border">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-muted border border-border flex items-center justify-center">
            <span className="text-muted-foreground font-bold text-xs">IF</span>
          </div>
          <span className="font-medium text-sm text-foreground uppercase tracking-wide">imagefeed</span>
        </Link>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-muted transition-colors">
              <Menu className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>nav</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/" className={`flex items-center space-x-2 w-full ${pathname === '/' ? 'bg-muted' : ''}`} onClick={() => setIsOpen(false)}>
                <Home className="w-3 h-3" />
                <span>home</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/saved"
                className={`flex items-center space-x-2 w-full ${pathname === '/saved' ? 'bg-muted' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Bookmark className="w-3 h-3" />
                <span>saved</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>settings</DropdownMenuLabel>

            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>cols</span>
              </div>
              <GridSizeToggle />
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>theme</span>
              </div>
              <ModeToggle />
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span>guest</span>
              </div>
              <LogOut className="w-3 h-3" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
