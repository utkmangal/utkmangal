import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import { useTranslation } from './i18n/translations';
import SEO from './components/SEO';
import LanguageToggle from './components/LanguageToggle';
import DarkModeToggle from './components/DarkModeToggle';
import PublicationCard from './components/PublicationCard';
import About from './sections/About';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import Teaching from './sections/Teaching';
import Contact from './sections/Contact';
import { 
  User, 
  FileText, 
  Beaker, 
  Briefcase, 
  Mail, 
  Github, 
  ExternalLink, 
  Award, 
  ChevronRight, 
  BookOpen, 
  Users, 
  Dna, 
  Layers,
  BarChart3,
  TrendingUp,
  Globe,
  Cpu,
  Zap,
  MousePointer2,
  Atom,
  Droplets,
  Box,
  Microscope,
  ArrowDown,
  Sparkles,
  Search
} from 'lucide-react';

// Static network data - moved outside component to prevent recreation
const NETWORK_NODES = [
  { id: 1, text: "Metagenomics", x: 20, y: 30, size: "text-2xl", color: "text-blue-400", connections: [2, 5, 7] },
  { id: 2, text: "Biofilms", x: 45, y: 20, size: "text-3xl", color: "text-slate-100", connections: [1, 3, 10] },
  { id: 3, text: "Zwitterionics", x: 75, y: 35, size: "text-xl", color: "text-purple-400", connections: [2, 4, 10] },
  { id: 4, text: "Microfluidics", x: 80, y: 65, size: "text-2xl", color: "text-emerald-400", connections: [3, 7] },
  { id: 5, text: "DADA2", x: 15, y: 60, size: "text-lg", color: "text-slate-400", connections: [1, 7] },
  { id: 6, text: "CAD/CAM", x: 50, y: 80, size: "text-xl", color: "text-orange-400", connections: [10, 8] },
  { id: 7, text: "Multiomics", x: 35, y: 50, size: "text-2xl", color: "text-blue-300", connections: [1, 4, 5] },
  { id: 8, text: "Nanozymes", x: 65, y: 85, size: "text-lg", color: "text-slate-400", connections: [6, 10] },
  { id: 9, text: "Oral Microbiome", x: 10, y: 85, size: "text-xl", color: "text-emerald-500", connections: [5, 7] },
  { id: 10, text: "Biomaterials", x: 55, y: 55, size: "text-3xl", color: "text-white", connections: [2, 3, 6, 8] },
];

const App = () => {
  const { lang } = useLanguage();
  const t = useTranslation(lang);
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [scholarMetrics, setScholarMetrics] = useState({
    citations: 0,
    hIndex: 0,
    i10Index: 0,
    loading: true,
    lastUpdated: null
  });

  // Fetch Google Scholar metrics dynamically
  useEffect(() => {
    const fetchScholarData = async () => {
      try {
        const response = await fetch('/utkmangal/scholar_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch scholar data');
        }
        const data = await response.json();
        
        setScholarMetrics({
          citations: data.metrics.citations || 0,
          hIndex: data.metrics.hIndex || 0,
          i10Index: data.metrics.i10Index || 0,
          loading: false,
          lastUpdated: data.metrics.lastUpdated || null
        });
      } catch (error) {
        console.error('Error fetching Scholar metrics:', error);
        // Fallback to default values
        setScholarMetrics({
          citations: 582,
          hIndex: 14,
          i10Index: 18,
          loading: false,
          lastUpdated: null
        });
      }
    };

    fetchScholarData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    location: "Seoul, Republic of Korea",
    tagline: "Engineering the next generation of symbiotic biomaterials through metagenomic insight.",
    bio: "I bridge clinical dentistry and molecular engineering to develop anti-fouling surfaces and AI-driven diagnostics.",
    skills: ["Metagenomics", "DADA2", "QIIME 2", "Bioinformatics", "Dental CAD/CAM", "Zwitterionic Materials", "Microfluidics"]
  };

  const publications = [
    {
      title: "Viscoelastic and antimicrobial dental care bioplastic with recyclable life cycle",
      journal: "Nature Communications",
      year: "2024",
      tags: ["Bioplastic", "Antimicrobial", "Sustainability"],
      impact: "High Impact",
      url: "https://www.nature.com/articles/s41467-024-53489-7"
    },
    {
      title: "Integrating phosphate enhances biomineralization effect of methacrylate cement",
      journal: "Advanced Healthcare Materials",
      year: "2024",
      tags: ["Biomineralization", "Dental Cement"],
      impact: "Lead Author",
      url: "https://advanced.onlinelibrary.wiley.com/doi/abs/10.1002/adhm.202402397"
    },
    {
      title: "Cerium oxide nanozymes confer a bio-friendly surface micro-environment",
      journal: "Biomaterials",
      year: "2023",
      tags: ["Nanozymes", "Surface Science"],
      impact: "Clinical Translation",
      url: "https://www.sciencedirect.com/science/article/pii/S0142961223000716"
    }
  ];

  const experience = [
    {
      role: "Assistant Research Professor",
      org: "Yonsei University College of Dentistry",
      period: "2025 – Present",
      desc: "Leading research on dental biomaterials and metagenomic biofilm characterization."
    },
    {
      role: "Assistant Research Professor",
      org: "Inno-Dent Convergence Academy",
      period: "2024 – 2025",
      desc: "Developed nanozyme dental polymer systems and biocompatible medical devices."
    },
    {
      role: "Assistant Research Professor",
      org: "Institute of Craniofacial Deformity",
      period: "2024 – 2025",
      desc: "Engineered anti-fouling dental biomaterials using zwitterionic modifiers."
    }
  ];

  // Memoized SVG connections using static data
  const svgConnections = useMemo(() => {
    const connections = [];
    NETWORK_NODES.forEach(node => {
      node.connections.forEach(targetId => {
        const target = NETWORK_NODES.find(n => n.id === targetId);
        if (target) {
          connections.push({
            key: `${node.id}-${targetId}`,
            x1: node.x,
            y1: node.y,
            x2: target.x,
            y2: target.y,
            sourceId: node.id,
            targetId: target.id
          });
        }
      });
    });
    return connections;
  }, []); // Empty dependency array since NETWORK_NODES is static

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
        activeTab === id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      <Icon size={18} className={`sm:w-5 sm:h-5 ${activeTab === id ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
      <span className="text-[11px] sm:text-[13px] md:text-[14px] mt-0.5 sm:mt-1 font-medium uppercase tracking-wider">{label}</span>
    </button>
  );

  const ResearchInfographic = () => {
    const branches = [
      { id: 'bio', label: lang === 'en' ? 'Bioinformatics' : '생물정보학', icon: Dna, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', desc: lang === 'en' ? 'Genomic Insight' : '게놈 통찰' },
      { id: 'fluid', label: lang === 'en' ? 'Microfluidics' : '미세유체공학', icon: Droplets, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', desc: lang === 'en' ? 'Multiomics Lab' : '멀티오믹스 랩' },
      { id: 'plat', label: lang === 'en' ? '3D Platforms' : '3D 플랫폼', icon: Box, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', desc: lang === 'en' ? 'Clinical Translation' : '임상 전환' },
      { id: 'zwit', label: lang === 'en' ? 'Zwitterionics' : '양쪽성 이온', icon: Atom, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', desc: lang === 'en' ? 'Interface Design' : '인터페이스 설계' }
    ];

    return (
      <div className="relative py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {t.research.methodological}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {t.research.pillars}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {t.research.pillarsDesc}
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-slate-900 dark:bg-slate-800 rotate-45 flex items-center justify-center shadow-2xl relative group transition-transform hover:scale-105 duration-300">
               <div className="-rotate-45 text-center px-4">
                  <div className="text-blue-400 dark:text-blue-300 font-black text-xs uppercase tracking-widest mb-1">
                    {lang === 'en' ? 'Central' : '중심'}
                  </div>
                  <h3 className="text-white font-black text-sm md:text-base leading-tight tracking-tight">
                    {lang === 'en'
                      ? <>Integrating dental biomaterials,<br/>microbiome science, and digital workflows</>
                      : <>치과 생체재료, 마이크로바이옴 과학,<br/>디지털 워크플로를 통합</>
                    }
                  </h3>
               </div>
               <div className="absolute -inset-2 rounded-[3.5rem] border border-blue-500/20 animate-pulse"></div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="w-0.5 h-12 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent"></div>
              <ArrowDown className="text-slate-300 dark:text-slate-600 animate-bounce" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {branches.map((b, i) => (
              <div 
                key={i} 
                className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 shadow-inner`}>
                  <b.icon size={32} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-base md:text-lg uppercase tracking-tight mb-2">
                  {b.label}
                </h4>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {b.desc}
                </p>
                <div className="mt-6 w-8 h-1 bg-slate-100 dark:bg-slate-700 rounded-full group-hover:w-16 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SEO />
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0, 50 0, 100 100 Z" fill="currentColor" className="text-blue-200 dark:text-blue-800" />
            </svg>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-2 sm:border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden mb-6 sm:mb-8 mx-auto ring-2 sm:ring-4 ring-blue-50 dark:ring-blue-900/50">
            <img src="/utkmangal/profile.jpg" alt={profile.name.en} className="w-full h-full object-cover" style={{objectPosition: 'center 20%'}} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-2 px-4">{profile.name[lang]}</h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light italic leading-relaxed px-4">
            "{t.home.tagline}"
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
            <button onClick={() => setActiveTab('publications')} className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-sm sm:text-base shadow-lg shadow-blue-200 dark:shadow-blue-900/50 active:scale-95 transition-all duration-300">
              {t.home.viewResearch}
            </button>
            <button onClick={() => setActiveTab('contact')} className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700 rounded-full font-medium text-sm sm:text-base shadow-sm active:scale-95 transition-all duration-300">
              {t.home.letsBuild}
            </button>
          </div>
        </div>
      </section>

      <ResearchInfographic />
    </div>
  );

  const ResearchView = () => (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 sm:mb-12">
            <div className="w-full lg:w-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 sm:mb-4 tracking-tighter">{t.research.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-lg text-base sm:text-lg">{t.research.subtitle}</p>
            </div>
            <div className="flex gap-3 sm:gap-4">
                <a href="https://scholar.google.co.kr/citations?user=Fi5CddUAAAAJ&view_op=list_works&sortby=pubdate" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300" title={t.research.viewTrends}>
                    <TrendingUp size={20} />
                </a>
                <a href="https://scholar.google.com/scholar?q=author%3A%22Utkarsh+Mangal%22" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300" title={t.research.searchPubs}>
                    <Search size={20} />
                </a>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {[
            { label: t.research.citations, value: scholarMetrics.citations, icon: Globe, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", trend: t.research.trends.citations },
            { label: t.research.hIndex, value: scholarMetrics.hIndex, icon: Award, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", trend: t.research.trends.hIndex },
            { label: t.research.i10Index, value: scholarMetrics.i10Index, icon: BarChart3, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", trend: t.research.trends.i10Index }
          ].map((m, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <m.icon size={28} />
                </div>
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{m.trend}</div>
              </div>
              <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {scholarMetrics.loading ? (
                  <div className="animate-pulse bg-slate-200 dark:bg-slate-700 h-10 w-24 rounded"></div>
                ) : (
                  m.value.toLocaleString()
                )}
              </div>
            </div>
          ))}
        </div>
        
        {scholarMetrics.lastUpdated && !scholarMetrics.loading && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full text-xs text-slate-500 dark:text-slate-400">
              <TrendingUp size={14} className="text-blue-500 dark:text-blue-400" />
              <span className="font-medium">{t.research.lastUpdated}: {scholarMetrics.lastUpdated}</span>
            </div>
          </div>
        )}

        {/* REINVENTED KEYWORD MAP */}
        <div className="relative p-1 px-1 rounded-[3rem] bg-slate-950 dark:bg-slate-950 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_#1e293b_0%,_transparent_50%)]"></div>
          
          <div className="relative z-10 p-10 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">{t.research.constellation}</h3>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-0.5">{t.research.connectivity}</p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {lang === 'en' ? 'Informatics' : '정보학'}
                    </span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {lang === 'en' ? 'Fluidics' : '유체학'}
                    </span>
                 </div>
            </div>
          </div>

          <div className="relative flex-grow min-h-[400px]">
            {/* SVG Lines for Connectivity */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {svgConnections.map(connection => (
                    <line 
                        key={connection.key}
                        x1={`${connection.x1}%`} y1={`${connection.y1}%`}
                        x2={`${connection.x2}%`} y2={`${connection.y2}%`}
                        stroke="#475569"
                        strokeWidth="0.5"
                    />
                ))}
            </svg>

            {/* Network Nodes as Static Labels */}
            {NETWORK_NODES.map(node => (
                <div 
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div className={`relative ${node.color} ${node.size} ${node.weight || 'font-black'} tracking-tighter uppercase whitespace-nowrap px-4 py-2 rounded-xl opacity-80`}>
                        {node.text}
                    </div>
                </div>
            ))}
          </div>
          
          <div className="relative z-10 p-8 pt-0 flex justify-center">
            <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">
                  {lang === 'en' ? 'Integrated Bio-Systems Design' : '통합 생물시스템 설계'}
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            <FileText className="text-blue-600 dark:text-blue-400" /> {t.research.selectedOutputs}
          </h2>
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {publications.map((pub, i) => (
          <PublicationCard key={i} publication={pub} />
        ))}
      </div>
      
      <div className="p-12 rounded-[3rem] bg-blue-600 dark:bg-blue-700 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-blue-900/50">
          <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase">
                {lang === 'en' ? 'Full Research Dossier' : '전체 연구 자료'}
              </h3>
              <p className="text-blue-100 dark:text-blue-200 text-lg opacity-80 max-w-md">
                {lang === 'en' 
                  ? '30+ peer-reviewed publications across Nature portfolio, Biomaterials, and Clinical journals.'
                  : 'Nature 포트폴리오, Biomaterials 및 임상 저널에 걸쳐 30개 이상의 동료 검토 논문.'
                }
              </p>
          </div>
          <a href="https://scholar.google.co.kr/citations?user=Fi5CddUAAAAJ" target="_blank" rel="noreferrer" className="relative z-10 px-10 py-5 bg-white text-blue-600 dark:text-blue-700 rounded-2xl font-black shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 uppercase tracking-widest text-sm">
            {lang === 'en' ? 'Scholar Metrics' : 'Scholar 지표'} <Globe size={18} />
          </a>
          <Dna className="absolute -right-20 -bottom-20 text-white/10 w-96 h-96" />
      </div>
    </div>
  );

  const StudentView = () => (
    <div className="py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-blue-600 rounded-[3rem] p-8 md:p-16 text-white mb-12 relative overflow-hidden shadow-2xl shadow-blue-100">
        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
            Collaborate With Us
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Let's Build and Explore Together</h2>
          <p className="text-blue-50 text-xl leading-relaxed max-w-2xl opacity-90">
            We are building a collaborative research community at the intersection of <strong>Bioinformatics</strong> and <strong>Dental Sciences</strong>. We're seeking talented graduate students and researchers who share our passion for innovation and discovery.
          </p>
        </div>
        <Dna className="absolute -right-10 -bottom-10 text-white/5 w-80 h-80" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <Beaker size={28} />
          </div>
          <h4 className="font-black text-lg mb-2 text-slate-900 uppercase tracking-tight leading-tight">Interface Microbiology</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Exploring multispecies biofilm dynamics on novel CAD/CAM and 3D-printed materials.</p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
            <Users size={28} />
          </div>
          <h4 className="font-black text-lg mb-2 text-slate-900 uppercase tracking-tight leading-tight">Bioinformatics Pipelines</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Developing 16S and Shotgun Metagenomic workflows using QIIME 2 and Python-based analysis.</p>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
            <Layers size={28} />
          </div>
          <h4 className="font-black text-lg mb-2 text-slate-900 uppercase tracking-tight leading-tight">Microfluidic Platforms</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Engineering lab-on-a-chip systems for context-specific multiomics analyses.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl">
        <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-blue-400">Our Collaborative Culture</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            "Interdisciplinary approach (Clinics + Bioinformatics)",
            "Direct path to High-Impact Journal publication",
            "State-of-the-art lab facilities at Yonsei University",
            "Direct collaboration with global industry partners"
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-slate-300">
              <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={18} />
              <span className="font-bold text-sm tracking-tight">{item}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => setActiveTab('contact')} className="mt-12 w-full md:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-blue-900/40 hover:scale-105 transition-all duration-300">
          Start a Conversation <Mail size={18} />
        </button>
      </div>
    </div>
  );

  const ExperienceView = () => (
    <div className="py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-5xl font-black mb-16 text-slate-900 tracking-tighter">Career Journey</h2>
      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {experience.map((item, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white bg-slate-900 text-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <Briefcase size={16} />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="font-black text-slate-900 uppercase tracking-tight">{item.role}</div>
                <time className="font-black text-[10px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{item.period}</time>
              </div>
              <div className="text-blue-600 text-xs font-black mb-4 uppercase tracking-widest">{item.org}</div>
              <div className="text-slate-500 text-sm leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-white antialiased transition-colors duration-300">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm py-2 md:py-3' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <img src="/utkmangal/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 duration-300" />
            <span className="font-black tracking-tighter text-base sm:text-xl hidden xs:block text-slate-900 dark:text-white uppercase">Utkarsh Mangal</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {['home', 'about', 'publications', 'projects', 'awards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] lg:text-xs font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeTab === tab ? 'text-blue-600 dark:text-blue-400 translate-y-[-2px]' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {t.nav[tab]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <DarkModeToggle />
            <LanguageToggle />
            <button 
              onClick={() => setActiveTab('contact')}
              className="hidden md:block px-4 lg:px-6 py-2 lg:py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-[9px] lg:text-[10px] font-black uppercase tracking-wider lg:tracking-widest rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-slate-900/10 dark:shadow-blue-900/50 active:scale-95"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </header>

      <main className="pb-20 sm:pb-24 pt-16 sm:pt-20 md:pt-24">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'about' && <About />}
        {activeTab === 'publications' && <ResearchView />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'awards' && <Awards />}
        {/* Teaching section - Hidden for now, will be included in future */}
        {/* {activeTab === 'teaching' && <Teaching />} */}
        {activeTab === 'contact' && <Contact />}
      </main>

      <nav className="lg:hidden fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 h-14 sm:h-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-100 dark:border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-around z-50 px-1 sm:px-2">
        <NavItem id="home" icon={User} label={t.nav.home} />
        <NavItem id="about" icon={FileText} label={t.nav.about} />
        <NavItem id="publications" icon={Sparkles} label={t.nav.publications} />
        <NavItem id="projects" icon={Box} label={t.nav.projects} />
        <NavItem id="contact" icon={Mail} label={t.nav.contact} />
      </nav>

      <footer className="hidden lg:block py-12 sm:py-16 lg:py-20 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-900 dark:bg-blue-600 rounded-md"></div>
                <span className="font-black text-xs uppercase tracking-[0.3em] text-slate-900 dark:text-white">Utkarsh Mangal</span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                © 2025 • {t.footer.rights}
            </div>
          </div>
          <div className="flex gap-10">
            {['ORCID', 'SCHOLAR', 'LINKEDIN', 'CV'].map(link => (
                <a key={link} href="#" className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 tracking-[0.2em] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
