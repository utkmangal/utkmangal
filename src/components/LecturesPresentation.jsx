import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { Calendar, MapPin, Mic2, Presentation as PresentationIcon } from 'lucide-react';

export default function LecturesPresentation() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const response = await fetch('/utkmangal/lectures-presentations.csv');
      if (!response.ok) throw new Error('Failed to fetch');
      const text = await response.text();
      const lectures = parseCSV(text);
      setLectures(lectures);
      setError(null);
    } catch (err) {
      console.error('Error fetching lectures:', err);
      setError('Unable to load lectures and presentations');
      setLectures([]);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim().replace(/"/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim().replace(/"/g, ''));

      if (values.length === headers.length) {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        data.push(obj);
      }
    }

    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type) => {
    return type === 'Lecture' ? <Mic2 size={20} /> : <PresentationIcon size={20} />;
  };

  const getTypeColor = (type) => {
    return type === 'Lecture' 
      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800';
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400">{lang === 'ko' ? '로딩 중...' : 'Loading...'}</p>
      </div>
    );
  }

  if (error || lectures.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400 dark:text-slate-500">{error || (lang === 'ko' ? '강연 및 발표가 없습니다.' : 'No lectures or presentations yet.')}</p>
      </div>
    );
  }

  return (
    <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-slate-200 dark:border-slate-700">
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tight">
        {lang === 'ko' ? '강연 및 발표' : 'Lectures & Presentations'}
      </h3>

      <div className="space-y-4 sm:space-y-5">
        {lectures.map((item, idx) => (
          <div
            key={idx}
            className={`group bg-white dark:bg-slate-800 rounded-xl lg:rounded-2xl p-4 sm:p-6 border transition-all duration-300 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900 ${
              item.type === 'Lecture'
                ? 'border-blue-100 dark:border-blue-900'
                : 'border-purple-100 dark:border-purple-900'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'ko' ? item.title_ko : item.title_en}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  {lang === 'ko' ? item.event_ko : item.event_en}
                </p>
              </div>
              <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider border flex items-center gap-2 whitespace-nowrap w-fit ${getTypeColor(item.type)}`}>
                {getTypeIcon(item.type)}
                {item.type === 'Lecture' ? (lang === 'ko' ? '강연' : 'Lecture') : (lang === 'ko' ? '발표' : 'Presentation')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">{formatDate(item.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                <span>{lang === 'ko' ? item.location_ko : item.location_en}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
