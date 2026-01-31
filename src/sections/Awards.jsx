import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { Award, Trophy, Medal, Star } from 'lucide-react';
import LecturesPresentation from '../components/LecturesPresentation';

export default function Awards() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);

  const awards = [
    {
      title: {
        en: "Marshall’s Award Finalist",
        ko: "마셜 어워드 파이널리스트"
      },
      organization: {
        en: "Academy of Dental Materials Conference (San Diego, USA)",
        ko: "치과재료학회(ADM) 학술대회 (미국 샌디에이고)"
      },
      year: "2023.10",
      description: {
        en: "Finalist recognition at the Academy of Dental Materials Conference.",
        ko: "치과재료학회(ADM) 학술대회에서 파이널리스트로 선정."
      },
      icon: Trophy
    },
    {
      title: {
        en: "Excellent Poster Presentation Award",
        ko: "우수 포스터 발표상"
      },
      organization: {
        en: "56th Annual Congress of the Korean Association of Orthodontists & Asia Pacific Orthodontic Conference",
        ko: "대한치과교정학회 제56차 학술대회 및 아시아-태평양 치과교정학회"
      },
      year: "2023.10",
      description: {
        en: "Excellent Poster Presentation Award at the 56th KAO Annual Congress & APOC.",
        ko: "대한치과교정학회 제56차 학술대회 및 APOC에서 우수 포스터 발표상 수상."
      },
      icon: Medal
    },
    {
      title: {
        en: "Excellent Poster Presentation Award",
        ko: "우수 포스터 발표상"
      },
      organization: {
        en: "55th Annual Congress of the Korean Association of Orthodontists & Asia Pacific Orthodontic Conference",
        ko: "대한치과교정학회 제55차 학술대회 및 아시아-태평양 치과교정학회"
      },
      year: "2022.10",
      description: {
        en: "Excellent Poster Presentation Award at the 55th KAO Annual Congress & APOC.",
        ko: "대한치과교정학회 제55차 학술대회 및 APOC에서 우수 포스터 발표상 수상."
      },
      icon: Medal
    },
    {
      title: {
        en: "Young Researcher JADR Travel Award",
        ko: "JADR 젊은 연구자 여행 지원상"
      },
      organization: {
        en: "41st Annual Meeting of the Korean Association for Dental Research (KADR), IADR-Korean Division",
        ko: "대한치과연구학회(KADR) 제41차 학술대회 (IADR 한국지부)"
      },
      year: "2022.09",
      description: {
        en: "Travel award for young researcher at KADR (IADR-Korean Division).",
        ko: "대한치과연구학회(KADR, IADR 한국지부)에서 젊은 연구자 여행 지원상 수상."
      },
      icon: Star
    },
    {
      title: {
        en: "Excellent Poster Presentation Award",
        ko: "우수 포스터 발표상"
      },
      organization: {
        en: "54th Annual Congress of the Korean Association of Orthodontists",
        ko: "대한치과교정학회 제54차 학술대회"
      },
      year: "2021.10",
      description: {
        en: "Excellent Poster Presentation Award at the 54th KAO Annual Congress.",
        ko: "대한치과교정학회 제54차 학술대회에서 우수 포스터 발표상 수상."
      },
      icon: Medal
    },
    {
      title: {
        en: "Best Poster Award",
        ko: "최우수 포스터상"
      },
      organization: {
        en: "40th Annual Meeting of the Korean Association for Dental Research (KADR), IADR-Korean Division",
        ko: "대한치과연구학회(KADR) 제40차 학술대회 (IADR 한국지부)"
      },
      year: "2021.09",
      description: {
        en: "Best Poster Award at KADR (IADR-Korean Division).",
        ko: "대한치과연구학회(KADR, IADR 한국지부)에서 최우수 포스터상 수상."
      },
      icon: Medal
    },
    {
      title: {
        en: "Merit Academic Paper Award",
        ko: "우수 학술논문상"
      },
      organization: {
        en: "Yonsei University College of Dentistry",
        ko: "연세대학교 치과대학"
      },
      year: "2020.12",
      description: {
        en: "Merit Academic Paper Award by Yonsei University College of Dentistry.",
        ko: "연세대학교 치과대학 우수 학술논문상 수상."
      },
      icon: Award
    },
    {
      title: {
        en: "KAUF-HUBIT Scholarship Award",
        ko: "KAUF-HUBIT 장학금"
      },
      organization: {
        en: "KAUF-HUBIT",
        ko: "KAUF-HUBIT"
      },
      year: "2020",
      description: {
        en: "Scholarship award (KAUF-HUBIT).",
        ko: "KAUF-HUBIT 장학금 수상."
      },
      icon: Award
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.awards.subtitle}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
          {t.awards.title}
        </h2>
      </div>

      {/* Awards Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 dark:from-blue-800 dark:via-blue-700 dark:to-blue-800"></div>

        {/* Awards */}
        <div className="space-y-8 sm:space-y-12">
          {awards.map((award, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col lg:flex-row gap-6 sm:gap-8 items-center ${
                idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div className="flex-1 w-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <award.icon size={24} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                        {award.title[lang]}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {award.organization[lang]}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {award.description[lang]}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                      {award.year}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Lectures & Presentations Section */}
      <LecturesPresentation />
    </div>
  );
}
