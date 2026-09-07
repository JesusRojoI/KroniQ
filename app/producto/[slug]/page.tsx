'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation('common');
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 text-center">
          <h1 className="text-4xl font-patua text-gray-900">Producto no encontrado</h1>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.slug,
      name: t(`products.${product.nameKey}`),
      nameKey: product.nameKey,
      price: product.price,
      quantity: 1,
      image: product.image,
      isCustom: false,
    });
    setShowToast(true);
    setTimeout(() => {
      window.location.href = '/carrito';
    }, 500);
  };

  const getDescriptionItems = () => {
    const items = [];
    for (let i = 1; i <= 12; i++) {
      const key = `${product.descriptionKey}_desc${i}`;
      const translated = t(`products.${key}`);
      if (translated && translated !== `products.${key}`) {
        items.push(translated);
      }
    }
    return items;
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <div className="sticky top-32">
                <img
                  src={product.image}
                  alt={t(`products.${product.nameKey}`)}
                  className="w-full h-auto shadow-xl object-cover"
                  style={{ borderRadius: '0.5rem' }}
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-4xl font-patua text-gray-900 mb-6">
                {t(`products.${product.nameKey}`)}
              </h1>
              <p className="text-3xl font-bold text-kroniq-purple mb-6">
                ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
                <span className="text-lg font-normal text-gray-500">
                  MXN +{t('products.vat')}
                </span>
              </p>
              
              <div className="bg-kroniq-cream p-6 mb-8" style={{ borderRadius: '0.5rem' }}>
                <ul className="space-y-3">
                  {getDescriptionItems().map((desc, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-kroniq-purple mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-4 px-12 rounded-lg transition-colors text-lg"
              >
                {t('products.addToCart')}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toast
        message={t('cart.addedToCart')}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}