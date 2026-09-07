'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesCarousel3D from '@/components/ServicesCarousel3D';
import { products } from '@/lib/products';

export default function HomePage() {
  const { t } = useTranslation('common');
  const [activeMosaic, setActiveMosaic] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveMosaic(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const services = [
    { key: 'service1', image: '/images/service1.jpg', titleKey: 'home.service1' },
    { key: 'service2', image: '/images/service2.jpg', titleKey: 'home.service2' },
    { key: 'service3', image: '/images/service3.jpg', titleKey: 'home.service3' },
    { key: 'service4', image: '/images/service4.jpg', titleKey: 'home.service4' },
    { key: 'service5', image: '/images/service5.jpg', titleKey: 'home.service5' },
    { key: 'service6', image: '/images/service6.jpg', titleKey: 'home.service6' },
    { key: 'service7', image: '/images/service7.jpg', titleKey: 'home.service7' },
    { key: 'service8', image: '/images/service8.jpg', titleKey: 'home.service8' },
    { key: 'service9', image: '/images/service9.jpg', titleKey: 'home.service9' },
    { key: 'service10', image: '/images/service10.jpg', titleKey: 'home.service10' },
  ];

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Sección 1 - Patrón concéntrico */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-kroniq-cream to-white">
          <div className="absolute inset-0 triangle-pattern-concentric" />
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-float">
              <Image
                src="/logo.svg"
                alt="KroniQ"
                width={400}
                height={133}
                className="w-full max-w-md mx-auto"
              />
            </div>
            
            <h1 className="font-patua text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
          </div>
        </section>

        {/* Sección 2 - Patrón entrelazado */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-interlaced" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-patua text-center text-kroniq-purple mb-12">
              {t('home.futureTitle')}
            </h2>
            
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-4xl font-patua text-gray-900 max-w-3xl mx-auto">
                {t('home.strategy')}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t('home.digitalDesign'), image: '/images/service1.jpg' },
                { title: t('home.visualStory'), image: '/images/service2.jpg' },
                { title: t('home.campaigns'), image: '/images/service3.jpg' },
                { title: t('home.visualStory'), image: '/images/service4.jpg' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg p-6 border-2 border-kroniq-green/30 hover:shadow-2xl hover:border-kroniq-green transition-all duration-300"
                  style={{ borderRadius: '0.5rem' }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-40 object-cover mb-4" 
                    style={{ borderRadius: '0.25rem' }}
                  />
                  <p className="text-center text-sm font-semibold text-gray-700">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 3 - Patrón diagonal */}
        <section className="relative py-24 bg-kroniq-cream overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-diagonal" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
              <div className="md:col-span-2">
                <img
                  src="/images/custom-package.jpg"
                  alt="Design"
                  className="w-full h-full object-cover shadow-xl"
                  style={{ borderRadius: '0.5rem' }}
                />
              </div>
              <div className="md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-patua text-gray-900 mb-6">
                  {t('home.strategicDesign')}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {t('home.strategicDesc')}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t('home.strategicDesc2')}
                </p>
              </div>
            </div>

            {/* Marquesina con fondo verde claro y texto morado oscuro */}
            <div className="relative mb-12 overflow-hidden" style={{
              backgroundColor: '#d4ffd4',
            }}>
              <div className="animate-marquee whitespace-nowrap py-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span 
                    key={i} 
                    className="text-2xl font-patua mx-8"
                    style={{ color: '#2d0a4e' }}
                  >
                    ✦              {t(         'home.featured')}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className={`relative overflow-hidden transition-all duration-700 ${
                    activeMosaic === idx ? 'mosaic-active' : 'mosaic-inactive'
                  }`}
                  style={{ borderRadius: '0.25rem' }}
                  onMouseEnter={() => {
                    setIsHovering(true);
                    setActiveMosaic(idx);
                  }}
                >
                  <img
                    src={product.image}
                    alt={t(`products.${product.nameKey}`)}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 4 - Patrón espiral */}
        <section className="relative py-24 bg-white overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-spiral" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-patua text-center text-gray-900 mb-16">
              {t('home.services')}
            </h2>
            
            <ServicesCarousel3D services={services} />
          </div>
        </section>

        {/* Sección 5 - Patrón sombra + mosaico */}
        <section className="relative py-24 bg-kroniq-dark overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-shadow" />
          <div className="absolute inset-0 triangle-pattern-mosaic" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t('home.approach')}
            </p>
            <h3 className="text-3xl md:text-5xl font-patua text-kroniq-green mb-4">
              {t('home.approach2')}
            </h3>
            <h3 className="text-3xl md:text-5xl font-patua text-white">
              {t('home.approach3')}
            </h3>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}