'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { t } = useTranslation('common');
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart();

  // Función para obtener el nombre traducido del producto
    // Función para obtener el nombre traducido del producto
  const getProductName = (item: any) => {
    if (item.isCustom) {
      // Para productos personalizados, traducir "Personalizado" y mostrar el ID
      const customLabel = t('custom.title');
      return `${customLabel} - ${item.quoteId || ''}`;
    }
    if (item.nameKey) {
      return t(`products.${item.nameKey}`);
    }
    return item.name;
  };

  return (
    <>
      <Header />
      <main className="relative pt-24 pb-24 overflow-hidden">
        {/* Patrón entrelazado */}
        <div className="absolute inset-0 triangle-pattern-interlaced" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-patua text-gray-900 mb-12">
            {t('cart.title')}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-gray-500 mb-8">{t('cart.empty')}</p>
              <Link
                href="/tienda"
                className="inline-block bg-kroniq-purple text-white font-semibold py-3 px-8 rounded-lg hover:bg-kroniq-purple/90 transition-colors"
              >
                {t('cart.shopNow')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                    <div className="col-span-6">{t('cart.product')}</div>
                    <div className="col-span-2 text-right">{t('cart.price')}</div>
                    <div className="col-span-2 text-center">{t('cart.quantity')}</div>
                    <div className="col-span-2 text-right">{t('cart.subtotal')}</div>
                  </div>
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-gray-100 items-center">
                      <div className="col-span-12 md:col-span-6 flex items-center space-x-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <Image
                          src={item.image}
                          alt={getProductName(item)}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">
                            {getProductName(item)}
                          </h3>
                          {item.quoteId && (
                            <p className="text-sm text-gray-500">
                              ID: {item.quoteId}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-right text-gray-900 font-medium">
                        ${item.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="col-span-4 md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-kroniq-purple"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-kroniq-purple"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-right text-kroniq-purple font-bold">
                        ${(item.price * item.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                  <h2 className="text-2xl font-patua text-gray-900 mb-6">
                    {t('cart.total')}
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>{t('cart.subtotal')}</span>
                      <span className="font-medium">
                        ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t('cart.iva')} (16%)</span>
                      <span className="font-medium">
                        ${tax.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-lg font-bold text-gray-900">{t('cart.total')}</span>
                      <span className="text-2xl font-bold text-kroniq-purple">
                        ${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/finalizar-compra"
                    className="block w-full text-center bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-4 rounded-lg transition-colors"
                  >
                    {t('cart.checkout')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}