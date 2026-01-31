import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { GraduationCap, Users, BookOpen, Video } from 'lucide-react';

export default function Teaching() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);

  const courses = [
    {
      title: {
        en: "Advanced Dental Biomaterials",
        ko: "고급 치과 생체재료학"
      },
      level: {
        en: "Graduate",
        ko: "대학원"
      },
      period: "2025 - Present",
      description: {
        en: "Comprehensive course covering cutting-edge biomaterial design, surface chemistry, and biofilm interactions",
        ko: "최첨단 생체재료 설계, 표면 화학 및 바이오필름 상호작용을 다루는 종합 과정"
      },
      students: 15
    },
    {
      title: {
        en: "Bioinformatics for Dental Research",
        ko: "치과 연구를 위한 생물정보학"
      },
      level: {
        en: "Graduate",
        ko: "대학원"
      },
      period: "2024 - Present",
      description: {
        en: "Hands-on training in DADA2, QIIME 2, and metagenomic analysis pipelines for oral microbiome research",
        ko: "구강 마이크로바이옴 연구를 위한 DADA2, QIIME 2 및 메타게놈 분석 파이프라인 실습 교육"
      },
      students: 12
    },
    {
      title: {
        en: "Digital Dentistry & CAD/CAM",
        ko: "디지털 치의학 및 CAD/CAM"
      },
      level: {
        en: "Undergraduate",
        ko: "학부"
      },
      period: "2024 - Present",
      description: {
        en: "Introduction to digital workflows, 3D printing, and computer-aided design in modern dentistry",
        ko: "현대 치의학의 디지털 워크플로우, 3D 프린팅 및 컴퓨터 지원 설계 입문"
      },
      students: 45
    }
  ];

  const students = [
    {
      name: "Current Ph.D. Candidates",
      count: 3,
      focus: {
        en: "Antimicrobial biomaterials & AI diagnostics",
        ko: "항균 생체재료 및 AI 진단"
      }
    },
    {
      name: "Current Master's Students",
      count: 5,
      focus: {
        en: "Metagenomics & surface engineering",
        ko: "메타게노믹스 및 표면 공학"
      }
    },
    {
      name: "Undergraduate Researchers",
      count: 8,
      focus: {
        en: "Laboratory techniques & data analysis",
        ko: "실험실 기법 및 데이터 분석"
      }
    }
  ];

  const workshops = [
    {
      title: {
        en: "Introduction to Metagenomic Analysis",
        ko: "메타게놈 분석 입문"
      },
      date: "2025",
      participants: 45,
      description: {
        en: "Two-day intensive workshop on QIIME 2 and microbial community analysis",
        ko: "QIIME 2 및 미생물 군집 분석에 관한 2일 집중 워크샵"
      }
    },
    {
      title: {
        en: "Dental Materials Innovation Forum",
        ko: "치과 재료 혁신 포럼"
      },
      date: "2024",
      participants: 120,
      description: {
        en: "Annual forum discussing latest advances in biomaterial engineering",
        ko: "생체재료 공학의 최신 발전을 논의하는 연례 포럼"
      }
    },
    {
      title: {
        en: "AI in Dentistry Bootcamp",
        ko: "치의학에서의 AI 부트캠프"
      },
      date: "2024",
      participants: 60,
      description: {
        en: "Three-day bootcamp on machine learning applications in dental diagnostics",
        ko: "치과 진단에서 머신 러닝 응용에 관한 3일 부트캠프"
      }
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.teaching.subtitle}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
          {t.teaching.title}
        </h2>
      </div>

      {/* Courses */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <GraduationCap className="text-blue-600 dark:text-blue-400" />
          {t.teaching.courses}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
                <span className="px-3 py-1 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">
                  {course.level[lang]}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {course.title[lang]}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {course.description[lang]}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{course.period}</span>
                <span className="text-slate-500 dark:text-slate-500 flex items-center gap-1">
                  <Users size={14} />
                  {course.students} {t.teaching.students}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Supervised */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <Users className="text-blue-600 dark:text-blue-400" />
          {t.teaching.students} ({t.teaching.current})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((student, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl p-6 border border-blue-100 dark:border-slate-700"
            >
              <div className="text-center mb-4">
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                  {student.count}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                  {student.name}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                {student.focus[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops */}
      <div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <Video className="text-blue-600 dark:text-blue-400" />
          {t.teaching.workshops}
        </h3>
        <div className="space-y-4">
          {workshops.map((workshop, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {workshop.title[lang]}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {workshop.description[lang]}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{workshop.date}</span>
                    <span className="text-slate-500 dark:text-slate-500 flex items-center gap-1">
                      <Users size={14} />
                      {workshop.participants} participants
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
