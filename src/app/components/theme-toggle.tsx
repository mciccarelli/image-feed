'use client';

import { useAtom } from 'jotai';
import { themeAtom } from '@/app/state/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 data-[state=checked]:bg-indigo-600"
      data-state={theme === 'dark' ? 'checked' : 'unchecked'}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
