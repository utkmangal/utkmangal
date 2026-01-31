import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white 
                 border border-slate-200 hover:border-blue-300 transition-all duration-300 
                 shadow-sm hover:shadow-md backdrop-blur-sm group"
      aria-label={`Switch to ${lang === 'en' ? 'Korean' : 'English'}`}
      title={`Switch to ${lang === 'en' ? '한국어' : 'English'}`}
    >
      <Globe size={16} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
        {lang === 'en' ? '한국어' : 'English'}
      </span>
    </button>
  );
}
