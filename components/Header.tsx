'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
// @ts-ignore
import CartSidebar from './CartSidebar';

export default function Header() {
  const { t } = useTranslation('common');
  const { items } = useCart();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const MexicoFlag = () => (
    <svg className="w-5 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" fill="#f0f0f0" r="256"/>
      <path d="m512 256c0-101.494-59.065-189.19-144.696-230.598v461.195c85.631-41.407 144.696-129.103 144.696-230.597z" fill="#d80027"/>
      <g fill="#6da544">
        <path d="m0 256c0 101.494 59.065 189.19 144.696 230.598v-461.196c-85.631 41.408-144.696 129.104-144.696 230.598z"/>
        <path d="m189.217 256c0 36.883 29.9 66.783 66.783 66.783s66.783-29.9 66.783-66.783v-22.261h-133.566z"/>
      </g>
      <path d="m345.043 211.478h-66.783c0-12.294-9.967-22.261-22.261-22.261s-22.261 9.967-22.261 22.261h-66.783c0 12.295 10.709 22.261 23.002 22.261h-.741c0 12.295 9.966 22.261 22.261 22.261 0 12.295 9.966 22.261 22.261 22.261h44.522c12.295 0 22.261-9.966 22.261-22.261 12.295 0 22.261-9.966 22.261-22.261h-.742c12.295 0 23.003-9.966 23.003-22.261z" fill="#ff9811"/>
    </svg>
  );

  const USAFlag = () => (
    <svg className="w-5 h-4" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <circle cx="256" cy="256" fill="#f0f0f0" r="256"/>
      <g fill="#d80027">
        <path d="m244.87 256h267.13c0-23.106-3.08-45.49-8.819-66.783h-258.311z"/>
        <path d="m244.87 122.435h229.556c-15.671-25.572-35.708-48.175-59.07-66.783h-170.486z"/>
        <path d="m256 512c60.249 0 115.626-20.824 159.356-55.652h-318.712c43.73 34.828 99.107 55.652 159.356 55.652z"/>
        <path d="m37.574 389.565h436.852c12.581-20.529 22.338-42.969 28.755-66.783h-494.362c6.417 23.814 16.174 46.254 28.755 66.783z"/>
      </g>
      <path d="m118.584 39.978h23.329l-21.7 15.765 8.289 25.509-21.699-15.765-21.699 15.765 7.16-22.037c-19.106 15.915-35.852 34.561-49.652 55.337h7.475l-13.813 10.035c-2.152 3.59-4.216 7.237-6.194 10.938l6.596 20.301-12.306-8.941c-3.059 6.481-5.857 13.108-8.372 19.873l7.267 22.368h26.822l-21.7 15.765 8.289 25.509-21.699-15.765-12.998 9.444c-1.301 10.458-1.979 21.11-1.979 31.921h256c0-141.384 0-158.052 0-256-50.572 0-97.715 14.67-137.416 39.978zm9.918 190.422-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm100.115 100.083-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822l-21.7 15.765zm-8.289-100.083 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822zm0-74.574 8.289 25.509-21.699-15.765-21.699 15.765 8.289-25.509-21.7-15.765h26.822l8.288-25.509 8.288 25.509h26.822z" fill="#0052b4"/>
    </svg>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/90 backdrop-blur-lg shadow-lg px-6 py-3 flex items-center justify-between border-b border-gray-200">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="KroniQ"
              width={100}
              height={35}
              className="h-9 w-auto"
              style={{ 
                filter: 'invert(13%) sepia(76%) saturate(7421%) hue-rotate(272deg) brightness(57%) contrast(98%)',
              }}
            />
          </Link>

          {/* Navegación */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-semibold text-gray-700 hover:text-kroniq-purple transition-colors"
            >
              {t('header.home')}
            </Link>
            <Link 
              href="/acerca-de" 
              className="text-sm font-semibold text-gray-700 hover:text-kroniq-purple transition-colors"
            >
              {t('header.about')}
            </Link>
            <Link 
              href="/tienda" 
              className="text-sm font-semibold text-gray-700 hover:text-kroniq-purple transition-colors"
            >
              {t('header.shop')}
            </Link>
            <Link 
              href="/contacto" 
              className="text-sm font-semibold text-gray-700 hover:text-kroniq-purple transition-colors"
            >
              {t('header.contact')}
            </Link>
          </nav>

          {/* Iconos derecha */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors"
            >
              {currentLanguage === 'es' ? <MexicoFlag /> : <USAFlag />}
              <span className="text-xs font-bold text-gray-700">
                {currentLanguage === 'es' ? 'ES' : 'EN'}
              </span>
            </button>

            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-kroniq-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{
                    animation: 'bounceIn 0.5s ease',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div ref={cartRef}>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <style jsx global>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}