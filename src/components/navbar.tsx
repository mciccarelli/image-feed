import { ModeToggle } from './mode-toggle';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-xs">
              IF
            </span>
          </div>
          <span className="font-medium text-sm text-black dark:text-white">
            ImageFeed
          </span>
        </div>

        <ModeToggle />
      </div>
    </nav>
  );
}
