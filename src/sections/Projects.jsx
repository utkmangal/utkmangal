import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { Box, ExternalLink, Users, Calendar, DollarSign } from 'lucide-react';

export default function Projects() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/utkmangal/projects.csv');
        if (!response.ok) throw new Error('Failed to load projects');
        
        const csv = await response.text();
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const parsed = lines.slice(1).map((line) => {
          // Parse CSV while handling quoted fields with commas
          const fields = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              fields.push(current.trim().replace(/^"|"$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          fields.push(current.trim().replace(/^"|"$/g, ''));

          return {
            title: {
              en: fields[0],
              ko: fields[1]
            },
            description: {
              en: fields[2],
              ko: fields[3]
            },
            status: fields[4],
            duration: fields[5],
            funding: {
              en: fields[6],
              ko: fields[7]
            },
            team: fields[8],
            tags: fields[9].split('|'),
            publication: fields[10] ? fields[10] : null
          };
        });

        setProjects(parsed);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects data');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'completed':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'planning':
        return 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center text-slate-500 dark:text-slate-400">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.projects.subtitle}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
          {t.projects.title}
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Box size={32} strokeWidth={2.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {project.title[lang]}
                  </h3>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border w-fit ${getStatusColor(project.status)}`}>
                    {t.projects.status[project.status]}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description[lang]}
                </p>

                {/* Meta Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider">
                        {t.projects.duration}
                      </div>
                      <div className="text-sm text-slate-900 dark:text-white font-medium">
                        {project.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider">
                        {t.projects.funding}
                      </div>
                      <div className="text-sm text-slate-900 dark:text-white font-medium">
                        {project.funding[lang]}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider">
                        {t.projects.team}
                      </div>
                      <div className="text-sm text-slate-900 dark:text-white font-medium">
                        {project.team}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link to Publication */}
                {project.publication && (
                  <a 
                    href={project.publication}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    <ExternalLink size={16} />
                    {t.common.readMore}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
