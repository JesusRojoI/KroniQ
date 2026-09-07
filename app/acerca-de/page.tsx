'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const { t } = useTranslation('common');

  const focusPoints = [
    { key: 'professionalize', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { key: 'communicate', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { key: 'differentiate', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { key: 'scale', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ];

  const approachItems = [
    { key: 'brandStrategy', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { key: 'visualDesign', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { key: 'functionalSystems', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { key: 'creativeDirection', icon: 'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4' },
    { key: 'structuredThinking', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  ];

  const whyChooseUs = [
    { key: 'strategicFocus', desc: 'strategicFocusDesc', image: '/images/about1.jpg' },
    { key: 'completeSystems', desc: 'completeSystemsDesc', image: '/images/about2.jpg' },
    { key: 'professionalDeliverables', desc: 'professionalDeliverablesDesc', image: '/images/about3.jpg' },
    { key: 'scalability', desc: 'scalabilityDesc', image: '/images/about4.jpg' },
    { key: 'investmentClarity', desc: 'investmentClarityDesc', image: '/images/about5.jpg' },
    { key: 'adaptation', desc: 'adaptationDesc', image: '/images/about6.jpg' },
  ];

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Sección 1 - Patrón punteado */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-dotted" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-patua text-center text-kroniq-purple mb-8">
              {t('about.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-center text-gray-700 max-w-4xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </section>

        {/* Imagen hero */}
        <section className="relative pb-16 overflow-hidden">
          <img
            src="/images/hero-bg.jpg"
            alt="Creative Studio"
            className="w-full h-96 object-cover"
          />
        </section>

        {/* Sección 2 - Patrón mosaico */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-mosaic" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <p className="text-xl text-gray-700 mb-4">
              {t('about.whoWeAre')}
            </p>
            <p className="text-xl text-gray-700 mb-12">
              {t('about.whoWeAre2')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {focusPoints.map((point, idx) => (
                <div key={idx} className="bg-kroniq-cream rounded-lg p-8 text-center hover:shadow-xl transition-shadow">
                  <svg className="w-16 h-16 text-kroniq-purple mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={point.icon} />
                  </svg>
                  <p className="text-lg font-semibold text-gray-900">{t(`about.${point.key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 3 - Patrón diagonal */}
        <section className="relative py-24 bg-kroniq-cream overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-diagonal" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-patua text-gray-900 mb-12">
              {t('about.approach')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approachItems.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
                  <svg className="w-12 h-12 text-kroniq-purple mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(`about.${item.key}`)}</h3>
                </div>
              ))}
              <div className="bg-kroniq-purple text-white rounded-lg p-8 shadow-md md:col-span-2 lg:col-span-1">
                <p className="leading-relaxed">
                  {t('about.notJustLogos')}
                </p>
                <p className="mt-4 leading-relaxed text-kroniq-green">
                  {t('about.eachPackage')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4 - Patrón entrelazado */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-interlaced" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-patua text-center text-gray-900 mb-16">
              {t('about.whyUs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                  <img src={item.image} alt={t(`about.${item.key}`)} className="w-full h-56 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-patua text-kroniq-purple mb-3">{t(`about.${item.key}`)}</h3>
                    <p className="text-gray-600 leading-relaxed">{t(`about.${item.desc}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 5 - SIN trama de triángulos */}
        <section className="py-24 bg-kroniq-dark">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h3 className="text-3xl md:text-5xl font-patua text-kroniq-green">
              {t('about.solution')}
            </h3>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}