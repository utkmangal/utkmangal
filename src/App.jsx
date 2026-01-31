import React, { useState, useEffect } from 'react';
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

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  
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
    name: "Utkarsh Mangal",
    degrees: "B.D.S, M.D.S, Ph.D",
    title: "Assistant Research Professor",
    dept: "Dept. of Oral Biology, Yonsei University College of Dentistry",
    location: "Seoul, Republic of Korea",
    tagline: "Engineering the next generation of biofilm-resistant biomaterials through metagenomic insight.",
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

  // Advanced Network Map Data
  const networkNodes = [
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

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        window.scrollTo(0, 0);
      }}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
        activeTab === id ? 'text-blue-600' : 'text-gray-500'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
      <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">{label}</span>
    </button>
  );

  const ResearchInfographic = () => {
    const branches = [
      { id: 'bio', label: 'Bioinformatics', icon: Dna, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Genomic Insight' },
      { id: 'fluid', label: 'Microfluidics', icon: Droplets, color: 'text-teal-600', bg: 'bg-teal-50', desc: 'Multiomics Lab' },
      { id: 'plat', label: '3D Platforms', icon: Box, color: 'text-orange-600', bg: 'bg-orange-50', desc: 'Clinical Translation' },
      { id: 'zwit', label: 'Zwitterionics', icon: Atom, color: 'text-purple-600', bg: 'bg-purple-50', desc: 'Interface Design' }
    ];

    return (
      <div className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Methodological Convergence
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Integrated Research Pillars
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Synergizing computational biology and molecular engineering to redefine the future of oral biomaterials.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] bg-slate-900 rotate-45 flex items-center justify-center shadow-2xl relative group transition-transform hover:scale-105 duration-300">
               <div className="-rotate-45 text-center px-4">
                  <div className="text-blue-400 font-black text-xs uppercase tracking-widest mb-1">Central</div>
                  <h3 className="text-white font-black text-lg md:text-xl uppercase leading-tight tracking-tight">
                    Microbiology<br/>Vision
                  </h3>
               </div>
               <div className="absolute -inset-2 rounded-[3.5rem] border border-blue-500/20 animate-pulse"></div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="w-0.5 h-12 bg-gradient-to-b from-slate-200 to-transparent"></div>
              <ArrowDown className="text-slate-300 animate-bounce" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {branches.map((b, i) => (
              <div 
                key={i} 
                className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 shadow-inner`}>
                  <b.icon size={32} strokeWidth={2.5} />
                </div>
                <h4 className="font-black text-slate-900 text-base md:text-lg uppercase tracking-tight mb-2">
                  {b.label}
                </h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {b.desc}
                </p>
                <div className="mt-6 w-8 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-blue-200 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative h-[85vh] flex flex-col justify-center items-center px-6 text-center bg-slate-50">
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0, 50 0, 100 100 Z" fill="currentColor" className="text-blue-200" />
            </svg>
        </div>
        
        <div className="relative z-10">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden mb-8 mx-auto ring-4 ring-blue-50">
            <img src="/utkmangal/profile.jpg" alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-2">{profile.name}</h1>
          <p className="text-lg md:text-xl text-blue-600 font-semibold mb-6 tracking-wide">{profile.degrees}</p>
          <p className="max-w-2xl text-xl md:text-2xl text-slate-700 font-light italic leading-relaxed">
            "{profile.tagline}"
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={() => setActiveTab('research')} className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-200 active:scale-95 transition-all duration-300">
              View Research
            </button>
            <button onClick={() => setActiveTab('students')} className="px-8 py-3 bg-white text-blue-600 border border-blue-100 rounded-full font-medium shadow-sm active:scale-95 transition-all duration-300">
              Let's Build Together
            </button>
          </div>
        </div>
      </section>

      <ResearchInfographic />
    </div>
  );

  const ResearchView = () => (
    <div className="py-24 px-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Research Impact</h2>
                <p className="text-slate-500 max-w-lg text-lg">Quantitative influence across global academic networks and thematic interconnections.</p>
            </div>
            <div className="flex gap-4">
                <button className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <TrendingUp size={20} />
                </button>
                <button className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Search size={20} />
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Total Citations", value: scholarMetrics.citations, icon: Globe, color: "text-blue-600", bg: "bg-blue-50", trend: "+12% this year" },
            { label: "H-Index", value: scholarMetrics.hIndex, icon: Award, color: "text-emerald-600", bg: "bg-emerald-50", trend: "High Impact" },
            { label: "i10-Index", value: scholarMetrics.i10Index, icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50", trend: "Broad Reach" }
          ].map((m, i) => (
            <div key={i} className="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${m.bg} ${m.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <m.icon size={28} />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{m.trend}</div>
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-4xl font-black text-slate-900 tracking-tight">
                {scholarMetrics.loading ? (
                  <div className="animate-pulse bg-slate-200 h-10 w-24 rounded"></div>
                ) : (
                  m.value.toLocaleString()
                )}
              </div>
            </div>
          ))}
        </div>
        
        {scholarMetrics.lastUpdated && !scholarMetrics.loading && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs text-slate-500">
              <TrendingUp size={14} className="text-blue-500" />
              <span className="font-medium">Last updated: {scholarMetrics.lastUpdated}</span>
            </div>
          </div>
        )}

        {/* REINVENTED KEYWORD MAP */}
        <div className="relative p-1 px-1 rounded-[3rem] bg-slate-950 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_#1e293b_0%,_transparent_50%)]"></div>
          
          <div className="relative z-10 p-10 pb-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="text-white font-black uppercase tracking-widest text-sm">Research Constellation</h3>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-0.5">Metagenomics & Biomaterials Connectivity</p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Informatics</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fluidics</span>
                 </div>
            </div>
          </div>

          <div className="relative flex-grow min-h-[400px]">
            {/* SVG Lines for Connectivity */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                {networkNodes.map(node => 
                    node.connections.map(targetId => {
                        const target = networkNodes.find(n => n.id === targetId);
                        if (!target) return null;
                        const isHovered = hoveredNode === node.id || hoveredNode === targetId;
                        return (
                            <line 
                                key={`${node.id}-${targetId}`}
                                x1={`${node.x}%`} y1={`${node.y}%`}
                                x2={`${target.x}%`} y2={`${target.y}%`}
                                stroke={isHovered ? "#3b82f6" : "#475569"}
                                strokeWidth={isHovered ? "2" : "0.5"}
                                className="transition-all duration-300"
                            />
                        );
                    })
                )}
            </svg>

            {/* Network Nodes as Floating Labels */}
            {networkNodes.map(node => (
                <div 
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div className={`relative ${node.color} ${node.size} ${node.weight || 'font-black'} tracking-tighter uppercase whitespace-nowrap px-4 py-2 rounded-xl transition-all duration-300 ${hoveredNode === node.id ? 'scale-110' : 'opacity-80'}`}>
                        {node.text}
                        {hoveredNode === node.id && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current"></div>}
                    </div>
                </div>
            ))}
          </div>
          
          <div className="relative z-10 p-8 pt-0 flex justify-center">
            <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Integrated Bio-Systems Design</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-grow bg-slate-100"></div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
            <FileText className="text-blue-600" /> Selected Outputs
          </h2>
          <div className="h-px flex-grow bg-slate-100"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {publications.map((pub, i) => (
          <div key={i} className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                {pub.journal}
              </span>
              <span className="text-emerald-600">
                <Award size={20} />
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 leading-snug transition-colors">
              {pub.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {pub.tags.map((tag, j) => (
                <span key={j} className="text-[9px] font-black text-slate-400 uppercase border border-slate-100 px-2 py-0.5 rounded-md tracking-widest">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400">{pub.year}</span>
                <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest hover:translate-x-1 transition-transform duration-300">
                    View Paper <ChevronRight size={14} />
                </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-12 rounded-[3rem] bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase">Full Research Dossier</h3>
              <p className="text-blue-100 text-lg opacity-80 max-w-md">30+ peer-reviewed publications across Nature portfolio, Biomaterials, and Clinical journals.</p>
          </div>
          <a href="https://scholar.google.co.kr/citations?user=Fi5CddUAAAAJ" target="_blank" rel="noreferrer" className="relative z-10 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 uppercase tracking-widest text-sm">
            Scholar Metrics <Globe size={18} />
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
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-8'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <img src="/utkmangal/logo.png" alt="Logo" className="w-10 h-10 transition-transform group-hover:scale-110 duration-300" />
            <span className="font-black tracking-tighter text-xl hidden sm:block text-slate-900 uppercase">Utkarsh Mangal</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['home', 'research', 'experience', 'students'].map((tab) => {
              const tabLabels = { home: 'Home', research: 'Research', experience: 'Experience', students: "Let's Colaborate!" };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-blue-600 ${
                    activeTab === tab ? 'text-blue-600 translate-y-[-2px]' : 'text-slate-400'
                  }`}
                >
                  {tabLabels[tab]}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => setActiveTab('contact')}
            className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-95"
          >
            Get In Touch
          </button>
        </div>
      </header>

      <main className="pb-24">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'research' && <ResearchView />}
        {activeTab === 'experience' && <ExperienceView />}
        {activeTab === 'students' && <StudentView />}
        
        {activeTab === 'contact' && (
          <div className="py-24 px-6 max-w-4xl mx-auto text-center animate-in fade-in duration-500">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                Collaboration Network
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tighter">Let's Connect</h2>
            <p className="text-slate-500 text-lg mb-16 max-w-2xl mx-auto">Open for research partnerships, graduate inquiries, and speaking engagements at the intersection of dental technology and bioinformatics.</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
               <a href="mailto:meta.mangal@yonsei.ac.kr" className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col items-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Mail size={32} />
                  </div>
                  <span className="font-black text-xl mb-1 group-hover:text-white uppercase tracking-tight">Email Me</span>
                  <span className="text-slate-500 text-sm group-hover:text-blue-100 font-bold">meta.mangal@yonsei.ac.kr</span>
               </a>
               <a href="https://github.com/utkmangal" target="_blank" rel="noreferrer" className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col items-center hover:bg-slate-900 hover:border-slate-900 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-white text-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Github size={32} />
                  </div>
                  <span className="font-black text-xl mb-1 group-hover:text-white uppercase tracking-tight">GitHub</span>
                  <span className="text-slate-500 text-sm group-hover:text-slate-400 font-bold">@utkmangal</span>
               </a>
            </div>

            <div className="p-12 rounded-[3rem] border border-slate-100 bg-white shadow-xl shadow-slate-100/50 max-w-xl mx-auto">
               <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                  <Globe className="text-slate-400" size={24} />
               </div>
               <h4 className="font-black mb-4 uppercase tracking-widest text-slate-900">Lab Location</h4>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Department of Oral Biology<br />
                  Yonsei University College of Dentistry<br />
                  50-1 Yonsei-ro, Seodaemun-gu<br />
                  Seoul 03722, Republic of Korea
               </p>
            </div>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl flex items-center justify-around z-50 px-2">
        <NavItem id="home" icon={User} label="Home" />
        <NavItem id="research" icon={Sparkles} label="Research" />
        <NavItem id="experience" icon={Briefcase} label="Exp" />
        <NavItem id="students" icon={Users} label="Collaborate" />
        <NavItem id="contact" icon={Mail} label="Contact" />
      </nav>

      <footer className="hidden md:block py-20 border-t border-slate-50 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-900 rounded-md"></div>
                <span className="font-black text-xs uppercase tracking-[0.3em] text-slate-900">Utkarsh Mangal</span>
            </div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                © 2025 • Applied Interface Microbiology Lab
            </div>
          </div>
          <div className="flex gap-10">
            {['ORCID', 'SCHOLAR', 'LINKEDIN', 'CV'].map(link => (
                <a key={link} href="#" className="text-[10px] font-black text-slate-400 hover:text-blue-600 tracking-[0.2em] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
