'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('kroniq_lang');
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setCurrentLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('kroniq_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}