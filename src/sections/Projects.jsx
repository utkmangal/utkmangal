import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { Box, ExternalLink, Users, Calendar, DollarSign, Search, X } from 'lucide-react';

const STATUS_FILTERS = ['all', 'ongoing', 'completed', 'planning'];
const ROLE_FILTERS = ['all', 'pi', 'lead', 'team'];

function getProjectRoleCategory(team) {
  const normalizedTeam = (team || '').toLowerCase();

  if (normalizedTeam.includes('principal investigator') || normalizedTeam.includes('pi-led') || normalizedTeam.includes('pi')) {
    return 'pi';
  }

  if (normalizedTeam.includes('lead')) {
    return 'lead';
  }

  return 'team';
}

export default function Projects() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}projects.csv`, {
          cache: 'no-store'
        });
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

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const statusMatches = statusFilter === 'all' || project.status === statusFilter;
      const roleMatches = roleFilter === 'all' || getProjectRoleCategory(project.team) === roleFilter;
      const searchableText = [
        project.title[lang],
        project.description[lang],
        project.duration,
        project.funding[lang],
        project.team,
        ...(project.tags || [])
      ]
        .join(' ')
        .toLowerCase();

      const queryMatches = !normalizedQuery || searchableText.includes(normalizedQuery);

      return statusMatches && roleMatches && queryMatches;
    });
  }, [projects, searchQuery, statusFilter, roleFilter, lang]);

  const counts = useMemo(() => {
    return projects.reduce(
      (acc, project) => {
        acc.total += 1;
        acc[project.status] = (acc[project.status] || 0) + 1;
        acc[getProjectRoleCategory(project.team)] += 1;
        return acc;
      },
      { total: 0, ongoing: 0, completed: 0, planning: 0, pi: 0, lead: 0, team: 0 }
    );
  }, [projects]);

  const activeFilters = searchQuery || statusFilter !== 'all' || roleFilter !== 'all';

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
        <div className="ui-chip mb-3 sm:mb-4 text-[9px] sm:text-[10px]">
          {t.projects.subtitle}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[color:var(--text)] mb-4 sm:mb-6 tracking-tight px-4">
          {t.projects.title}
        </h2>
      </div>

      {/* Project Filters */}
      <div className="ui-card p-5 sm:p-6 mb-8 sm:mb-10">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">
          <div className="flex-1">
            <label htmlFor="project-search" className="sr-only">
              {lang === 'en' ? 'Search projects' : '프로젝트 검색'}
            </label>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--muted)]" aria-hidden="true" />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={lang === 'en' ? 'Search titles, tags, teams, or funding' : '제목, 태그, 팀, 연구비 검색'}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] py-3 pl-11 pr-11 text-sm sm:text-base text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:bg-[color:var(--surface)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)] transition-colors"
                  aria-label={lang === 'en' ? 'Clear project search' : '프로젝트 검색 지우기'}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {lang === 'en' ? 'Status' : '상태'}
            </span>
            {STATUS_FILTERS.map((status) => {
              const isActive = statusFilter === status;
              const label = status === 'all'
                ? (lang === 'en' ? 'All' : '전체')
                : t.projects.status[status];
              const count = status === 'all' ? counts.total : counts[status];

              return (
                <button
                  key={status}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setStatusFilter(status)}
                  className={`ui-nav-pill whitespace-nowrap ${isActive ? 'ui-nav-pill-active' : ''}`}
                >
                  {label} · {count}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {lang === 'en' ? 'Role' : '역할'}
            </span>
            {ROLE_FILTERS.map((role) => {
              const isActive = roleFilter === role;
              const label = {
                all: lang === 'en' ? 'All roles' : '전체 역할',
                pi: lang === 'en' ? 'PI' : 'PI',
                lead: lang === 'en' ? 'Lead researcher' : '주연구자',
                team: lang === 'en' ? 'Team' : '팀'
              }[role];
              const count = role === 'all' ? counts.total : counts[role];

              return (
                <button
                  key={role}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setRoleFilter(role)}
                  className={`ui-nav-pill whitespace-nowrap ${isActive ? 'ui-nav-pill-active' : ''}`}
                >
                  {label} · {count}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-[color:var(--muted)]">
            {lang === 'en'
              ? `${filteredProjects.length} of ${projects.length} projects shown`
              : `${projects.length}개 중 ${filteredProjects.length}개 프로젝트 표시`}
          </div>
        </div>

        {activeFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {lang === 'en' ? 'Active filters' : '적용 중인 필터'}
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
                {searchQuery}
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-current"
                  aria-label={lang === 'en' ? 'Remove search filter' : '검색 필터 제거'}
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
                {t.projects.status[statusFilter]}
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className="text-current"
                  aria-label={lang === 'en' ? 'Remove status filter' : '상태 필터 제거'}
                >
                  ×
                </button>
              </span>
            )}
            {roleFilter !== 'all' && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-strong)]">
                {{
                  pi: 'PI',
                  lead: lang === 'en' ? 'Lead researcher' : '주연구자',
                  team: lang === 'en' ? 'Team' : '팀'
                }[roleFilter]}
                <button
                  type="button"
                  onClick={() => setRoleFilter('all')}
                  className="text-current"
                  aria-label={lang === 'en' ? 'Remove role filter' : '역할 필터 제거'}
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="ui-card p-10 text-center">
          <div className="text-lg font-black text-[color:var(--text)] mb-2">
            {lang === 'en' ? 'No projects match these filters' : '해당 조건의 프로젝트가 없습니다'}
          </div>
          <p className="text-sm text-[color:var(--muted)] mb-4">
            {lang === 'en'
              ? 'Try clearing one of the filters or search terms.'
              : '필터나 검색어를 지우고 다시 시도해 보세요.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setRoleFilter('all');
            }}
            className="ui-btn-secondary"
          >
            {lang === 'en' ? 'Reset filters' : '필터 초기화'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <div 
            key={idx}
            className="ui-card p-8 group"
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
      )}
    </div>
  );
}
