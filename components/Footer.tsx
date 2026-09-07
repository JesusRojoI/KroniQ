'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-kroniq-dark text-white relative overflow-hidden">
      {/* Trama de triángulos con color más cercano al fondo */}
      <div className="absolute inset-0" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='60,3 117,117 3,117' fill='none' stroke='%23b0ffb0' stroke-opacity='0.03' stroke-width='2.5'/%3E%3Cpolygon points='60,15 105,105 15,105' fill='none' stroke='%23b0ffb0' stroke-opacity='0.02' stroke-width='2'/%3E%3Cpolygon points='60,27 93,93 27,93' fill='none' stroke='%23b0ffb0' stroke-opacity='0.015' stroke-width='1.5'/%3E%3Cpolygon points='60,39 81,81 39,81' fill='none' stroke='%23b0ffb0' stroke-opacity='0.01' stroke-width='1'/%3E%3C/svg%3E\")",
        backgroundSize: '120px 120px',
        backgroundRepeat: 'repeat',
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-6">
            <h3 className="text-2xl font-patua mb-6 text-kroniq-green">
              {t('footer.stayConnected')}
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>studio@kroniq.com.mx</p>
              <p>+52 1 55 1552 0105</p>
              <p>Sierra Gorda No. 36, Despacho 305 MZ,</p>
              <p>Col. Lomas de Chapultepec I Sección,</p>
              <p>Alcaldía Miguel Hidalgo, C.P. 11000, CDMX</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-patua mb-6 text-kroniq-green">
              {t('footer.links')}
            </h3>
            <div className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.home')}
              </Link>
              <Link href="/acerca-de" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.about')}
              </Link>
              <Link href="/tienda" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.shop')}
              </Link>
              <Link href="/contacto" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-lg font-patua mb-6 text-kroniq-green">
              {t('footer.legal')}
            </h3>
            <div className="space-y-3">
              <Link href="/terminos-condiciones" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/politica-privacidad" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/politicas-reembolso" className="block text-gray-300 hover:text-white transition-colors">
                {t('footer.refund')}
              </Link>
              <div className="flex items-center space-x-4 pt-4">
  <div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow" style={{ width: '70px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Image src="/visa.svg" alt="Visa" width={55} height={35} className="w-auto h-auto max-w-full max-h-full object-contain" />
  </div>
  <div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow" style={{ width: '70px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Image src="/mastercard.svg" alt="Mastercard" width={55} height={35} className="w-auto h-auto max-w-full max-h-full object-contain" />
  </div>
</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <Image
            src="/logo.svg"
            alt="KroniQ"
            width={2000}
            height={200}
            className="w-full h-auto opacity-80 mb-8"
          />
          <p className="text-center text-gray-400 text-sm">
            © 2026 KroniQ. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}