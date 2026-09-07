'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface OrderData {
  nombre: string;
  email: string;
  productos: Array<{ 
    nombre: string; 
    nameKey?: string;
    cantidad: number; 
    precio: number;
    isCustom?: boolean;
  }>;
  subtotal: number;
  impuesto: number;
  total: number;
  transactionId: string;
  orderId?: string;
}

export default function SuccessPage() {
  const { t } = useTranslation('common');
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        setOrderData(JSON.parse(savedOrder));
      } catch (e) {
        console.error('Error parsing order data:', e);
      }
    }
  }, []);

  // Función para obtener el nombre traducido del producto
    // Función para obtener el nombre traducido del producto
  const getProductName = (product: any) => {
    if (product.isCustom) {
      const customLabel = t('custom.title');
      const quoteId = product.quoteId || product.nombre?.split(' - ')[1] || '';
      return `${customLabel} - ${quoteId}`;
    }
    if (product.nameKey) {
      return t(`products.${product.nameKey}`);
    }
    return product.nombre;
  };

  return (
    <>
      <Header />
      <main className="relative pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 triangle-pattern-concentric" />
        <div className="absolute inset-0 triangle-pattern-dotted" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-kroniq-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-kroniq-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-patua text-gray-900 mb-4">
              {t('success.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {t('success.subtitle')}
            </p>
            <p className="text-gray-500">
              {t('success.checkEmail')}
            </p>
          </div>

          {orderData && (
            <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-patua text-gray-900 mb-6">
                {t('success.orderSummary')}
              </h2>
              <div className="space-y-4 mb-6">
                {orderData.productos.map((product, idx) => (
                  <div key={idx} className="flex justify-between text-gray-700">
                    <span>{getProductName(product)} × {product.cantidad}</span>
                    <span className="font-medium">
                      ${(product.precio * product.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>${orderData.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.iva')} (16%)</span>
                  <span>${orderData.impuesto.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">{t('cart.total')}</span>
                  <span className="text-2xl font-bold text-kroniq-purple">
                    ${orderData.total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
                  </span>
                </div>
              </div>
              {orderData.orderId && (
                <div className="mt-6 p-4 bg-kroniq-cream rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>{t('success.transactionId')}:</strong> {orderData.orderId}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/tienda"
              className="inline-block bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-4 px-12 rounded-lg transition-colors text-lg"
            >
              {t('success.continueShopping')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}