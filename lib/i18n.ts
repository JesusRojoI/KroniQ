'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import esCommon from '@/public/locales/es/common.json';
import enCommon from '@/public/locales/en/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: esCommon,
      },
      en: {
        common: enCommon,
      },
    },
    fallbackLng: 'es',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;