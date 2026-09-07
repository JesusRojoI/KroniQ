'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import { products, productCategories } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const { t } = useTranslation('common');
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: any) => {
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
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-24">
        {/* Sección 1 - Patrón concéntrico */}
        <section className="relative max-w-7xl mx-auto px-6 mb-16 overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-concentric" />
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-patua text-center text-kroniq-purple mb-8">
              {t('shop.title')}
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('shop.subtitle')}
            </p>
          </div>
        </section>

        {/* Sección 2 - Patrón superpuesto */}
        <section className="relative max-w-7xl mx-auto px-6 mb-12 overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-overlap" />
          <div className="relative z-10">
            <div className="flex flex-wrap justify-center gap-3">
              {productCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    activeCategory === cat.key
                      ? 'bg-kroniq-purple text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t(`shop.${cat.labelKey}`)}
                  <span className={`ml-2 text-sm ${
                    activeCategory === cat.key ? 'text-kroniq-green' : 'text-gray-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de productos */}
        <section className="relative max-w-7xl mx-auto px-6 mb-24 overflow-hidden">
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                  style={{ borderRadius: '0.5rem' }}
                >
                  <Link href={`/producto/${product.slug}`} className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={t(`products.${product.nameKey}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <Link href={`/producto/${product.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-kroniq-purple transition-colors line-clamp-2">
                        {t(`products.${product.nameKey}`)}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold text-kroniq-purple mb-4">
                      ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2 })}{' '}
                      <span className="text-sm font-normal text-gray-500">
                        MXN +{t('products.vat')}
                      </span>
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto w-full bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      {t('shop.hire')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección 3 - Patrón sombra */}
        <section className="relative max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="absolute inset-0 triangle-pattern-shadow" />
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-kroniq-purple to-kroniq-dark overflow-hidden shadow-2xl" style={{ borderRadius: '0.5rem' }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-patua text-kroniq-green mb-6">
                    {t('shop.customPackage')}
                  </h2>
                  <p className="text-gray-200 mb-4 leading-relaxed">
                    {t('shop.customDesc')}
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {t('shop.customDesc2')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contacto"
                      className="bg-white text-kroniq-purple hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      {t('shop.requestDiagnosis')}
                    </Link>
                    <Link
                      href="/personalizado-2"
                      className="bg-kroniq-green text-kroniq-dark hover:bg-kroniq-green/80 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
                    >
                      {t('shop.payCustom')}
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[400px]">
                  <img
                    src="/images/custom-package.jpg"
                    alt="Custom Package"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-kroniq-purple to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
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