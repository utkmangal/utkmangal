import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  MapPin,
  FileText,
  BookOpen,
  Code,
  Microscope,
  ChevronRight
} from 'lucide-react';

export default function About() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);

  const profile = {
    name: {
      en: "Utkarsh Mangal",
      ko: "만갈웃커시"
    },
    degrees: "BDS, MDS (Ortho), Ph.D",
    title: {
      en: "Assistant Research Professor",
      ko: "연구조교수"
    },
    dept: {
      en: "Dept. of Oral Biology, Yonsei University College of Dentistry",
      ko: "연세대학교 치과대학 구강생물학교실"
    },
    location: {
      en: "Seoul, Republic of Korea",
      ko: "대한민국 서울"
    }
  };

  const education = [
    {
      degree: {
        en: "Ph.D. in Dentistry",
        ko: "치의학 박사"
      },
      institution: {
        en: "Yonsei University College of Dentistry, Seoul, Korea",
        ko: "연세대학교 치과대학, 서울, 대한민국"
      },
      year: "2024",
      focus: {
        en: "Biomaterials & Metagenomics",
        ko: "생체재료 및 메타게노믹스"
      }
    },
    {
      degree: {
        en: "Master of Dental Surgery (MDS) in Orthodontics",
        ko: "치과교정학 석사"
      },
      institution: {
        en: "Manipal University, College of Dentistry, Mangalore, India",
        ko: "마니팔 대학교 치과대학, 망갈로르, 인도"
      },
      year: "2017",
      focus: {
        en: "Clinical Dentistry",
        ko: "임상 치의학"
      }
    },
    {
      degree: {
        en: "Bachelor in Dental Surgery (BDS)",
        ko: "치과학 학사"
      },
      institution: {
        en: "Manipal University, College of Dentistry, Mangalore, India",
        ko: "마니팔 대학교 치과대학, 망갈로르, 인도"
      },
      year: "2013",
      focus: {
        en: "Dental Medicine",
        ko: "치의학"
      }
    }
  ];

  const experience = [
    {
      role: {
        en: "Assistant Research Professor",
        ko: "연구조교수"
      },
      org: {
        en: "Yonsei University College of Dentistry",
        ko: "연세대학교 치과대학"
      },
      period: "2025 – Present",
      desc: {
        en: "Leading research on dental biomaterials and metagenomic biofilm characterization.",
        ko: "치과 생체재료 및 메타게놈 바이오필름 특성화 연구를 주도하고 있습니다."
      }
    },
    {
      role: {
        en: "Assistant Research Professor",
        ko: "연구조교수"
      },
      org: {
        en: "Inno-Dent Convergence Academy",
        ko: "이노덴트 융합 아카데미"
      },
      period: "2024 – 2025",
      desc: {
        en: "Developed nanozyme dental polymer systems and biocompatible medical devices.",
        ko: "나노자임 치과 고분자 시스템 및 생체적합 의료기기를 개발했습니다."
      }
    },
    {
      role: {
        en: "Assistant Research Professor",
        ko: "연구조교수"
      },
      org: {
        en: "Institute of Craniofacial Deformity",
        ko: "두개안면기형연구소"
      },
      period: "2024 – 2025",
      desc: {
        en: "Engineered anti-fouling dental biomaterials using zwitterionic modifiers.",
        ko: "양쪽성 이온 조절제를 사용한 오염 방지 치과 생체재료를 개발했습니다."
      }
    }
  ];

  const interests = [
    {
      title: {
        en: "Metagenomics & Microbiome",
        ko: "메타게노믹스 및 마이크로바이옴"
      },
      icon: Microscope,
      desc: {
        en: "Analyzing microbial communities using DADA2, QIIME 2, and multiomics approaches",
        ko: "DADA2, QIIME 2 및 멀티오믹스 접근법을 사용한 미생물 군집 분석"
      }
    },
    {
      title: {
        en: "Biomaterial Engineering",
        ko: "생체재료 공학"
      },
      icon: Code,
      desc: {
        en: "Developing anti-fouling surfaces with zwitterionic materials and nanozymes",
        ko: "양쪽성 이온 재료 및 나노자임을 활용한 오염 방지 표면 개발"
      }
    },
    {
      title: {
        en: "Dental CAD/CAM",
        ko: "치과 CAD/CAM"
      },
      icon: BookOpen,
      desc: {
        en: "Digital dentistry and computer-aided design/manufacturing systems",
        ko: "디지털 치의학 및 컴퓨터 지원 설계/제조 시스템"
      }
    },
    {
      title: {
        en: "AI-Driven Diagnostics",
        ko: "AI 기반 진단"
      },
      icon: Code,
      desc: {
        en: "Machine learning applications for biofilm detection and material optimization",
        ko: "바이오필름 감지 및 재료 최적화를 위한 머신 러닝 응용"
      }
    }
  ];

  const skills = {
    computational: {
      title: {
        en: "Computational Biology",
        ko: "전산 생물학"
      },
      items: ["DADA2", "QIIME 2", "Bioinformatics", "Multiomics", "Python", "R"]
    },
    materials: {
      title: {
        en: "Materials Science",
        ko: "재료 과학"
      },
      items: ["Zwitterionic Materials", "Nanozymes", "Biomineralization", "Surface Chemistry", "Microfluidics"]
    },
    clinical: {
      title: {
        en: "Clinical Dentistry",
        ko: "임상 치의학"
      },
      items: ["Dental CAD/CAM", "Conservative Dentistry", "Endodontics", "Biomaterial Testing"]
    }
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.about.subtitle}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
          {t.about.title}
        </h2>
      </div>

      {/* Bio Section */}
      <div className="mb-12 sm:mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <User size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-1 sm:mb-2">{profile.name[lang]}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1 text-sm sm:text-base">{profile.degrees}</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-1">{profile.title[lang]}</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm">{profile.dept[lang]}</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              <p className="leading-relaxed">{t.about.bioIntro}</p>
              <p className="leading-relaxed">{t.about.bioMain}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="/utkmangal/assets/cv/CV_Utkarsh_Mangal.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-lg shadow-blue-200 dark:shadow-blue-900/50 transition-all duration-300"
              >
                <FileText size={18} />
                {t.about.downloadCV}
              </a>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-slate-900 dark:text-white">{t.about.subtitle}</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{profile.location[lang]}</p>
          </div>
        </div>
      </div>

      {/* Research Interests */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <Microscope className="text-blue-600 dark:text-blue-400" />
          {t.about.interests}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <interest.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{interest.title[lang]}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{interest.desc[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <GraduationCap className="text-blue-600 dark:text-blue-400" />
          {t.about.education}
        </h3>
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{edu.degree[lang]}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{edu.institution[lang]}</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold">{edu.focus[lang]}</p>
                </div>
                <div className="text-slate-500 dark:text-slate-500 text-sm font-semibold">{edu.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-20">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <Briefcase className="text-blue-600 dark:text-blue-400" />
          Experience
        </h3>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <ChevronRight size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white">{exp.role[lang]}</h4>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-medium">{exp.org[lang]}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{exp.desc[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <Code className="text-blue-600 dark:text-blue-400" />
          {t.about.skills}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(skills).map((category, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700"
            >
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">{category.title[lang]}</h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
