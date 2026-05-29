import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm group bg-[color:var(--surface)]/90 border-[color:var(--border)] hover:bg-[color:var(--surface-strong)]"
      aria-label={`Switch to ${lang === 'en' ? 'Korean' : 'English'}`}
      title={`Switch to ${lang === 'en' ? '한국어' : 'English'}`}
    >
      <Globe size={16} className="text-[color:var(--muted)] group-hover:text-[color:var(--brand-strong)] transition-colors" />
      <span className="text-sm font-semibold text-[color:var(--text)] group-hover:text-[color:var(--brand-strong)] transition-colors">
        {lang === 'en' ? '한국어' : 'English'}
      </span>
    </button>
  );
}
