'use client';

import { Bookmark, LogOut, User, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { GridSizeToggle } from './grid-size-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 w-48 bg-background border-r border-border text-foreground font-mono text-xs">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="px-3 py-2 border-b border-border h-10 flex items-center">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-5 h-5 bg-muted border border-border flex items-center justify-center">
              <span className="text-muted-foreground font-bold text-xs">IF</span>
            </div>
            <span className="font-medium text-xs text-foreground uppercase tracking-wide">imagefeed</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-4">
          <div className="space-y-1">
            <Link
              href="/"
              className={`flex items-center space-x-2 pl-3 pr-2 py-1.5 transition-colors border-r-2 ${
                pathname === '/'
                  ? 'bg-muted/30 text-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10 border-transparent'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Home</span>
            </Link>
            <Link
              href="/saved"
              className={`flex items-center space-x-2 pl-3 pr-2 py-1.5 transition-colors border-r-2 ${
                pathname === '/saved'
                  ? 'bg-muted/30 text-foreground border-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/10 border-transparent'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wide">Saved</span>
            </Link>
            
            {/* User Profile */}
            <div className="pt-2 border-t border-border/50 mt-2">
              <div className="flex items-center justify-between pl-3 pr-2 py-1.5">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <Avatar className="w-4 h-4">
                    <AvatarFallback className="bg-muted border border-border text-muted-foreground text-xs font-mono">u</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate uppercase tracking-wide">guest</p>
                  </div>
                </div>
                <button className="p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="Logout">
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Controls */}
        <div className="px-3 py-2 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">cols</span>
            <GridSizeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">theme</span>
            <ModeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
