'use client';

import React, { useEffect, useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import i18n from '@/lib/i18n';
import { I18nextProvider } from 'react-i18next';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <CartProvider>
          {isMounted ? children : (
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-kroniq-purple border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </CartProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}