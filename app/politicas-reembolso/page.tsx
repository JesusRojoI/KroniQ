'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="relative pt-24 pb-24 overflow-hidden">
        {/* Patrón de triángulos */}
        <div className="absolute inset-0 triangle-pattern-overlap" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Título principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.title')}
            </h1>
            <h2 className="text-xl md:text-2xl font-patua text-gray-900 mb-2">
              {t('legal.refund.subtitle')}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">
              {t('legal.refund.address')}
            </p>
          </div>

          {/* Sección 01 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section01Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section01Content1')}
            </p>
          </section>

          {/* Sección 02 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section02Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.refund.section02Content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section02Content2')}
            </p>
          </section>

          {/* Sección 03 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section03Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section03Content1')}
            </p>
          </section>

          {/* Sección 04 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section04Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.refund.section04Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.refund.section04List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.refund.section04List2')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section04Content2')}
            </p>
          </section>

          {/* Sección 05 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section05Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.refund.section05Content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section05Content2')}
            </p>
          </section>

          {/* Sección 06 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section06Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.refund.section06Content1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section06Content2')}
            </p>
          </section>

          {/* Sección 07 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.refund.section07Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.refund.section07Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.refund.section07List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.refund.section07List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.refund.section07List3')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.refund.section07Content2')}
            </p>
          </section>

          {/* Firma */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-lg font-patua text-gray-900">
              FAYRIX S.A. DE C.V.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}