import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

export default function SEO({ 
  title, 
  description, 
  keywords = [], 
  image = '/utkmangal/profile.jpg',
  type = 'website'
}) {
  const { lang } = useLanguage();
  
  const defaultTitle = 'Utkarsh Mangal - Dental Biomaterials & Metagenomics Researcher';
  const defaultDescription = {
    en: 'Assistant Research Professor specializing in dental biomaterials, metagenomics, and AI-driven diagnostics at Yonsei University College of Dentistry.',
    ko: '연세대학교 치과대학 치과 생체재료, 메타게노믹스, AI 기반 진단 전문 조교수'
  };

  const fullTitle = title ? `${title} | Utkarsh Mangal` : defaultTitle;
  const fullDescription = description || defaultDescription[lang];
  const keywordsString = keywords.length > 0 
    ? keywords.join(', ') 
    : 'dental biomaterials, metagenomics, bioinformatics, DADA2, QIIME 2, zwitterionic materials, nanozymes, CAD/CAM, oral microbiome';

  const siteUrl = 'https://utkmangal.github.io/utkmangal';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content="Utkarsh Mangal" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Utkarsh Mangal" />
      <meta property="og:locale" content={lang === 'ko' ? 'ko_KR' : 'en_US'} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@utkmangal" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
}
