import { Bookmark, LogOut, User } from 'lucide-react';
import Link from 'next/link';
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
import { Avatar, AvatarFallback } from './ui/avatar';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border text-foreground font-mono">
      <div className="mx-auto px-3 h-10 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-muted border border-border rounded flex items-center justify-center">
            <span className="text-muted-foreground font-bold text-xs">IF</span>
          </div>
          <span className="font-medium text-sm text-foreground">imagefeed</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link href="/saved" className="p-1.5 hover:bg-accent hover:text-accent-foreground rounded transition-colors" aria-label="View saved images">
            <Bookmark className="w-4 h-4" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-0">
              <Avatar className="w-6 h-6 cursor-pointer hover:ring-1 hover:ring-border transition-all">
                <AvatarFallback className="bg-muted border border-border text-muted-foreground text-xs font-mono">u</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-screen sm:w-64 mr-0 mt-0 bg-background border-0 border-t border-border shadow-xl text-foreground font-mono text-xs rounded-none sm:rounded-md sm:border sm:mr-2 sm:mt-1"
              align="end"
              sideOffset={0}
            >
              <DropdownMenuLabel className="font-normal px-2 py-1">
                <div className="flex flex-col">
                  <p className="text-xs font-medium text-foreground">guest</p>
                  <p className="text-[10px] text-muted-foreground">guest@localhost</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1">
                  <User className="mr-2 h-3 w-3" />
                  <span>profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer text-muted-foreground hover:bg-accent hover:text-accent-foreground px-2 py-1">
                <LogOut className="mr-2 h-3 w-3" />
                <span>logout</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border" />

              <DropdownMenuLabel className="text-[10px] font-medium text-muted-foreground px-2 py-1">Settings</DropdownMenuLabel>

              <div className="px-2 py-1.5">
                <GridSizeToggle />
              </div>
              <div className="px-2 py-1.5">
                <ModeToggle />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
