'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Spinner from '@/components/Spinner';

export default function CustomPackagePage() {
  const { t } = useTranslation('common');
  const { currentLanguage } = useLanguage();
  const { addItem } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    quoteId: '',
    amount: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('custom.firstNameError');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('custom.emailError');
    }
    if (!formData.quoteId.trim()) {
      newErrors.quoteId = t('custom.quoteIdError');
    }
    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) {
      newErrors.amount = t('custom.amountError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const amount = parseFloat(formData.amount);
      
      // Agregar al carrito como producto personalizado
      addItem({
        id: `custom-${formData.quoteId}`,
        name: `Personalizado - ${formData.quoteId}`,
        price: amount,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=300&h=300&fit=crop',
        isCustom: true,
        quoteId: formData.quoteId,
      });

      // Enviar correo
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom',
          customData: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            quoteId: formData.quoteId,
            amount: amount,
          },
          language: currentLanguage,
        }),
      });

      router.push('/carrito');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-patua text-kroniq-purple text-center mb-12">
            {t('custom.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen */}
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=800&fit=crop"
                alt="Custom Package"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Formulario */}
            <div className="order-1 md:order-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('custom.firstName')}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder={t('custom.firstNamePlaceholder')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('custom.lastName')}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder={t('custom.lastNamePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kroniq-purple"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('custom.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('custom.emailPlaceholder')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="quoteId" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('custom.quoteId')}
                    </label>
                    <input
                      type="text"
                      id="quoteId"
                      value={formData.quoteId}
                      onChange={(e) => setFormData({ ...formData, quoteId: e.target.value })}
                      placeholder={t('custom.quoteIdPlaceholder')}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.quoteId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                    />
                    {errors.quoteId && <p className="text-red-500 text-sm mt-1">{errors.quoteId}</p>}
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('custom.amount')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        id="amount"
                        step="0.01"
                        min="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder={t('custom.amountPlaceholder')}
                        className={`w-full pl-8 px-4 py-3 rounded-lg border ${errors.amount ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                      />
                    </div>
                    {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-kroniq-green text-kroniq-dark hover:bg-kroniq-green/80 font-semibold py-4 rounded-full transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? <Spinner size="sm" /> : t('custom.pay')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}