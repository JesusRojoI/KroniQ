'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main className="relative pt-24 pb-24 overflow-hidden">
        {/* Patrón de triángulos */}
        <div className="absolute inset-0 triangle-pattern-concentric" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Título principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.title')}
            </h1>
            <h2 className="text-xl md:text-2xl font-patua text-gray-900 mb-2">
              {t('legal.privacy.subtitle')}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide">
              {t('legal.privacy.address')}
            </p>
          </div>

          {/* Introducción */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-700 italic leading-relaxed text-lg">
              {t('legal.privacy.intro')}
            </p>
          </div>

          {/* Sección 01 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section01Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section01Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section01List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section01List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section01List3')}</li>
            </ul>
          </section>

          {/* Sección 02 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section02Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {t('legal.privacy.section02Content1')}
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {t('legal.privacy.section02Subtitle1')}
            </h4>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List4')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List5')}</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {t('legal.privacy.section02Subtitle2')}
            </h4>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List6')}</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {t('legal.privacy.section02Subtitle3')}
            </h4>
            <ul className="list-disc list-inside space-y-2 mb-6 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section02List7')}</li>
            </ul>

            <p className="text-gray-700 leading-relaxed font-medium">
              {t('legal.privacy.section02Content2')}
            </p>
          </section>

          {/* Sección 03 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section03Title')}
            </h3>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {t('legal.privacy.section03Subtitle1')}
            </h4>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section03List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section03List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section03List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section03List4')}</li>
            </ul>
          </section>

          {/* Sección 04 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section04Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section04Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section04List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section04List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section04List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section04List4')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section04List5')}</li>
            </ul>
          </section>

          {/* Sección 05 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section05Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section05Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section05List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section05List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section05List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section05List4')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.privacy.section05Content2')}
            </p>
          </section>

          {/* Sección 06 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section06Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section06Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section06List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section06List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section06List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section06List4')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section06Content2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.privacy.section06Content3')}
            </p>
          </section>

          {/* Sección 07 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section07Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('legal.privacy.section07Content1')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 pl-2">
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section07List1')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section07List2')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section07List3')}</li>
              <li className="text-gray-700 leading-relaxed">{t('legal.privacy.section07List4')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.privacy.section07Content2')}
            </p>
          </section>

          {/* Sección 08 */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl md:text-2xl font-patua text-kroniq-purple mb-4">
              {t('legal.privacy.section08Title')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('legal.privacy.section08Content1')}
            </p>
          </section>

          {/* Firma y versión */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-lg font-patua text-gray-900 mb-2">
              {t('legal.privacy.signature')}
            </p>
            <p className="text-sm text-gray-500">
              {t('legal.privacy.version')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}