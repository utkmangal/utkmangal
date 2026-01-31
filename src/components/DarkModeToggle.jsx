import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-full bg-white/80 hover:bg-white 
                 border border-slate-200 hover:border-blue-300 transition-all duration-300 
                 shadow-sm hover:shadow-md backdrop-blur-sm group"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      ) : (
        <Moon size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      )}
    </button>
  );
}
