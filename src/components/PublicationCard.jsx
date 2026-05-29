import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { ExternalLink, ChevronDown, ChevronUp, Quote } from 'lucide-react';

export default function PublicationCard({ publication }) {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className="ui-card rounded-xl lg:rounded-2xl p-4 sm:p-6 group">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-[color:var(--text)] mb-2 sm:mb-3 leading-snug group-hover:text-[color:var(--brand-strong)] transition-colors">
        {publication.title}
      </h3>

      {/* Authors and Year */}
      <p className="text-xs sm:text-sm text-[color:var(--muted)] mb-2">
        {publication.authors || 'Utkarsh Mangal et al.'} · {publication.year}
      </p>

      {/* Journal */}
      <p className="text-xs sm:text-sm text-[color:var(--brand-strong)] font-semibold mb-3 sm:mb-4">
        {publication.journal || publication.venue}
      </p>

      {/* Citations and Impact */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        {publication.citations && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[color:var(--muted)]">
            <Quote size={12} className="sm:w-3.5 sm:h-3.5 text-[color:var(--brand-strong)]" />
            <span className="font-semibold">{publication.citations}</span>
            <span className="hidden sm:inline">{t.publications.citationsCount}</span>
            <span className="sm:hidden">cit.</span>
          </div>
        )}
        {publication.impact && (
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[color:var(--brand-soft)] text-[color:var(--brand-strong)]">
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
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-[color:var(--surface-strong)] text-[color:var(--muted)]"
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
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors bg-[color:var(--surface-strong)] text-[color:var(--muted)] hover:text-[color:var(--text)]"
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
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors bg-[color:var(--brand)] hover:bg-[color:var(--brand-strong)]"
          >
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t.publications.paper}</span>
            <span className="sm:hidden">Paper</span>
          </a>
        )}
      </div>

      {/* Abstract Content */}
      {showAbstract && publication.abstract && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[color:var(--border)]">
          <p className="text-xs sm:text-sm text-[color:var(--muted)] leading-relaxed">
            {publication.abstract}
          </p>
        </div>
      )}
    </div>
  );
}
