import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../i18n/translations';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react';

export default function Contact() {
  const { lang } = useLanguage();
  const t = useTranslation(lang);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'meta.mangal@yonsei.ac.kr',
      link: 'mailto:meta.mangal@yonsei.ac.kr'
    },
    {
      icon: MapPin,
      label: t.contact.office,
      value: {
        en: 'Yonsei University College of Dentistry, Seoul, Korea',
        ko: '연세대학교 치과대학, 서울, 대한민국'
      },
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/utkmangal',
      color: 'hover:text-slate-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/utkarsh-mangal',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: 'https://twitter.com/utkmangal',
      color: 'hover:text-sky-500'
    },
    {
      icon: ExternalLink,
      label: 'Google Scholar',
      url: 'https://scholar.google.co.kr/citations?user=Fi5CddUAAAAJ',
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-block px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {t.contact.subtitle}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          {t.contact.title}
        </h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
          {/* Contact Details */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              {lang === 'en' ? 'Contact Information' : '연락처 정보'}
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider mb-1">
                      {info.label}
                    </div>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {typeof info.value === 'string' ? info.value : info.value[lang]}
                      </a>
                    ) : (
                      <div className="text-sm text-slate-900 dark:text-white">
                        {typeof info.value === 'string' ? info.value : info.value[lang]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-3xl p-8 border border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {t.contact.availability}
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {lang === 'en' 
                ? 'Open to research collaborations, speaking engagements, and consulting opportunities in dental biomaterials and metagenomics.'
                : '치과 생체재료 및 메타게노믹스 분야의 연구 협력, 강연 및 컨설팅 기회에 열려 있습니다.'
              }
            </p>
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              {t.footer.social}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group ${social.color}`}
                >
                  <social.icon size={20} className="text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
