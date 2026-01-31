import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { ExternalLink, ChevronDown, ChevronUp, Quote } from 'lucide-react';

export default function PublicationCard({ publication }) {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {publication.title}
      </h3>

      {/* Authors and Year */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
        {publication.authors || 'Utkarsh Mangal et al.'} · {publication.year}
      </p>

      {/* Journal */}
      <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3 sm:mb-4">
        {publication.journal || publication.venue}
      </p>

      {/* Citations and Impact */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        {publication.citations && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <Quote size={12} className="sm:w-3.5 sm:h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold">{publication.citations}</span>
            <span className="hidden sm:inline">{t.publications.citationsCount}</span>
            <span className="sm:hidden">cit.</span>
          </div>
        )}
        {publication.impact && (
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[10px] sm:text-xs font-bold">
            {publication.impact}
          </span>
        )}
      </div>

      {/* Tags */}
      {publication.tags && publication.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {publication.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] sm:text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Abstract Toggle and Link */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {publication.abstract && (
          <button
            onClick={() => setShowAbstract(!showAbstract)}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            {showAbstract ? <ChevronUp size={14} className="sm:w-4 sm:h-4" /> : <ChevronDown size={14} className="sm:w-4 sm:h-4" />}
            <span className="hidden sm:inline">{showAbstract ? t.publications.hideAbstract : t.publications.showAbstract}</span>
            <span className="sm:hidden">{showAbstract ? 'Hide' : 'Show'}</span>
          </button>
        )}
        {publication.url && (
          <a 
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t.publications.paper}</span>
            <span className="sm:hidden">Paper</span>
          </a>
        )}
      </div>

      {/* Abstract Content */}
      {showAbstract && publication.abstract && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      )}
    </div>
  );
}
