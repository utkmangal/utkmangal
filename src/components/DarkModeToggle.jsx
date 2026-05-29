import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2.5 rounded-full border transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm group bg-[color:var(--surface)]/90 border-[color:var(--border)] hover:bg-[color:var(--surface-strong)]"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun size={18} className="text-[color:var(--muted)] group-hover:text-[color:var(--brand-strong)] transition-colors" />
      ) : (
        <Moon size={18} className="text-[color:var(--muted)] group-hover:text-[color:var(--brand-strong)] transition-colors" />
      )}
    </button>
  );
}
