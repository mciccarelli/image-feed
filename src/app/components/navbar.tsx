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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-700/50 dark:border-gray-800/50 text-gray-100 font-mono">
      <div className="mx-auto px-3 h-10 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
            <span className="text-gray-300 font-bold text-xs">IF</span>
          </div>
          <span className="font-medium text-sm text-gray-200">imagefeed</span>
        </Link>

        <div className="flex items-center space-x-2">
          <Link href="/saved" className="p-1.5 hover:bg-gray-800 rounded transition-colors" aria-label="View saved images">
            <Bookmark className="w-4 h-4" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-0">
              <Avatar className="w-6 h-6 cursor-pointer hover:ring-1 hover:ring-gray-500 transition-all">
                <AvatarFallback className="bg-gray-800 border border-gray-600 text-gray-300 text-xs font-mono">u</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-screen sm:w-64 mr-0 mt-0 bg-gray-950 border-0 border-t border-gray-700 shadow-xl text-gray-100 font-mono text-xs rounded-none sm:rounded-md sm:border sm:mr-2 sm:mt-1"
              align="end"
              sideOffset={0}
            >
              <DropdownMenuLabel className="font-normal px-2 py-1">
                <div className="flex flex-col">
                  <p className="text-xs font-medium text-gray-200">guest</p>
                  <p className="text-[10px] text-gray-500">guest@localhost</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-800" />

              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-2 py-1">
                  <User className="mr-2 h-3 w-3" />
                  <span>profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-gray-100 px-2 py-1">
                <LogOut className="mr-2 h-3 w-3" />
                <span>logout</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-gray-800" />

              <DropdownMenuLabel className="text-[10px] font-medium text-gray-500 px-2 py-1">Settings</DropdownMenuLabel>

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
