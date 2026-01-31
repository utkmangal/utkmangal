import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { Box, ExternalLink, Users, Calendar, DollarSign } from 'lucide-react';

export default function Projects() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);

  const projects = [
    {
      title: {
        en: "AI-Driven Biofilm Detection System",
        ko: "AI 기반 바이오필름 감지 시스템"
      },
      description: {
        en: "Developing machine learning algorithms for real-time biofilm detection on dental materials using multiomics data.",
        ko: "멀티오믹스 데이터를 사용하여 치과 재료의 실시간 바이오필름 감지를 위한 머신 러닝 알고리즘 개발."
      },
      status: "ongoing",
      duration: "2025 - 2026",
      funding: {
        en: "National Research Foundation",
        ko: "국가연구재단"
      },
      team: "5 researchers",
      tags: ["AI", "Metagenomics", "Diagnostics"]
    },
    {
      title: {
        en: "Zwitterionic Anti-Fouling Surfaces",
        ko: "양쪽성 이온 오염 방지 표면"
      },
      description: {
        en: "Engineering next-generation dental implant surfaces with superior biofilm resistance using zwitterionic polymer modifications.",
        ko: "양쪽성 이온 고분자 개질을 사용한 우수한 바이오필름 저항성을 가진 차세대 치과 임플란트 표면 개발."
      },
      status: "ongoing",
      duration: "2024 - 2026",
      funding: {
        en: "Ministry of Health & Welfare",
        ko: "보건복지부"
      },
      team: "8 researchers",
      tags: ["Biomaterials", "Surface Chemistry", "Implants"]
    },
    {
      title: {
        en: "Nanozyme-Enhanced Dental Polymers",
        ko: "나노자임 강화 치과 고분자"
      },
      description: {
        en: "Creating biocompatible dental polymers with integrated cerium oxide nanozymes for enhanced antimicrobial properties.",
        ko: "향상된 항균 특성을 위해 세륨 산화물 나노자임이 통합된 생체적합 치과 고분자 제작."
      },
      status: "completed",
      duration: "2023 - 2024",
      funding: {
        en: "Yonsei University",
        ko: "연세대학교"
      },
      team: "6 researchers",
      tags: ["Nanozymes", "Polymers", "Antimicrobial"],
      publication: "https://www.sciencedirect.com/science/article/pii/S0142961223000716"
    },
    {
      title: {
        en: "Oral Microbiome Mapping Platform",
        ko: "구강 마이크로바이옴 매핑 플랫폼"
      },
      description: {
        en: "Comprehensive metagenomic analysis platform for characterizing oral biofilm communities using DADA2 and QIIME 2 pipelines.",
        ko: "DADA2 및 QIIME 2 파이프라인을 사용한 구강 바이오필름 군집 특성화를 위한 포괄적인 메타게놈 분석 플랫폼."
      },
      status: "completed",
      duration: "2022 - 2024",
      funding: {
        en: "Korea Health Technology R&D Project",
        ko: "한국 보건기술연구개발사업"
      },
      team: "4 researchers",
      tags: ["Metagenomics", "Bioinformatics", "Microbiome"]
    },
    {
      title: {
        en: "3D Printed Biomimetic Scaffolds",
        ko: "3D 프린팅 생체모방 스캐폴드"
      },
      description: {
        en: "Designing and fabricating 3D printed dental scaffolds with biomimetic properties for tissue engineering applications.",
        ko: "조직 공학 응용을 위한 생체모방 특성을 가진 3D 프린팅 치과 스캐폴드 설계 및 제작."
      },
      status: "planning",
      duration: "2026 - 2027",
      funding: {
        en: "Pending Grant Application",
        ko: "연구비 신청 중"
      },
      team: "TBD",
      tags: ["3D Printing", "Tissue Engineering", "CAD/CAM"]
    }
  ];

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
