'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  key: string;
  image: string;
  titleKey: string;
}

interface ServicesCarousel3DProps {
  services: Service[];
}

export default function ServicesCarousel3D({ services }: ServicesCarousel3DProps) {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const getPosition = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff % services.length) + services.length) % services.length;
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        zIndex: 10,
        opacity: 1,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === services.length - 1) {
      const direction = normalizedDiff === 1 ? 1 : -1;
      return {
        transform: `translateX(${direction * 60}%) scale(0.8) rotateY(${direction * -30}deg)`,
        zIndex: 5,
        opacity: 0.6,
      };
    } else if (normalizedDiff === 2 || normalizedDiff === services.length - 2) {
      const direction = normalizedDiff === 2 ? 1 : -1;
      return {
        transform: `translateX(${direction * 90}%) scale(0.6) rotateY(${direction * -50}deg)`,
        zIndex: 3,
        opacity: 0.3,
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.4) rotateY(0deg)',
        zIndex: 1,
        opacity: 0,
      };
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Contenedor del carrusel */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Fondo con triángulos */}
        <div className="absolute inset-0 triangle-pattern opacity-10" />
        
        {/* Tarjetas */}
        <div className="relative w-full max-w-md h-full">
          {services.map((service, index) => {
            const position = getPosition(index);
            return (
              <div
                key={service.key}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                style={{
                  transform: position.transform,
                  zIndex: position.zIndex,
                  opacity: position.opacity,
                  pointerEvents: index === currentIndex ? 'auto' : 'none',
                }}
              >
                <div 
                  className="bg-white shadow-2xl overflow-hidden w-72"
                  style={{ borderRadius: '0.5rem' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={t(service.titleKey)}
                      className="w-full h-full object-cover"
                    />
                    {/* Triángulo decorativo */}
                    <div className="absolute top-0 right-0">
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <polygon points="40,0 40,40 0,0" fill="#b0ffb0" opacity="0.8"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(service.titleKey)}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flechas de navegación */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-kroniq-purple text-gray-700 hover:text-white w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300"
          style={{ borderRadius: '0.5rem' }}
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-kroniq-purple text-gray-700 hover:text-white w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300"
          style={{ borderRadius: '0.5rem' }}
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-kroniq-purple' : 'w-2 bg-gray-300'
            }`}
            style={{ borderRadius: '9999px' }}
            aria-label={`Ir al servicio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}