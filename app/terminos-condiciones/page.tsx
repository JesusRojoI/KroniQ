'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-patua text-kroniq-purple mb-6">
            {t('footer.terms')}
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-2xl font-patua text-gray-900 mb-4">
              {t('legal.comingSoon')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('legal.comingSoonDesc')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}