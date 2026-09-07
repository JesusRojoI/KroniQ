'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useTranslation('common');
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (formData.name.length < 3) {
      newErrors.name = t('contact.nameError');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.emailError');
    }
    if (formData.message.length < 10) {
      newErrors.message = t('contact.messageError');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          to: formData.email,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          language: currentLanguage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Título - Patrón espiral */}
          <div className="relative text-center mb-16 overflow-hidden py-8">
            <div className="absolute inset-0 triangle-pattern-spiral" />
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-patua text-kroniq-purple mb-6">
                {t('contact.title')}
              </h1>
              <p className="text-2xl text-gray-700 mb-4">
                {t('contact.talkToUs')}
              </p>
              <h2 className="text-3xl font-patua text-gray-900">
                {t('contact.buildBrand')}
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                {t('contact.ready')}
              </p>
            </div>
          </div>

          {/* Cómo iniciar - Patrón punteado */}
          <div className="relative bg-kroniq-cream rounded-lg p-8 mb-12 overflow-hidden">
            <div className="absolute inset-0 triangle-pattern-dotted" />
            <div className="relative z-10">
              <h3 className="text-xl font-patua text-kroniq-purple mb-4">
                {t('contact.howToStart')}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">{t('contact.step1')}</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>{t('contact.step1a')}</li>
                  <li>{t('contact.step1b')}</li>
                  <li>{t('contact.step1c')}</li>
                  <li>{t('contact.step1d')}</li>
                </ul>
                <p className="font-semibold mt-4">{t('contact.step2')}</p>
              </div>
            </div>
          </div>

          {/* Formulario - Patrón mosaico */}
          <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow-xl p-8 mb-12 overflow-hidden">
            <div className="absolute inset-0 triangle-pattern-mosaic" />
            <div className="relative z-10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('contact.namePlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('contact.emailPlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contact.messagePlaceholder')}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-kroniq-purple resize-none`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-4 rounded-lg transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? <Spinner size="sm" /> : t('contact.send')}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {t('contact.success')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {t('contact.error')}
                </div>
              )}
            </div>
          </form>

          {/* Información de contacto - Patrón superpuesto */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 overflow-hidden p-4">
            <div className="absolute inset-0 triangle-pattern-overlap" />
            <div className="relative z-10 bg-kroniq-dark text-white rounded-lg p-8">
              <h3 className="text-xl font-patua text-kroniq-green mb-6">
                {t('contact.contactInfo')}
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>studio@kroniq.com.mx</p>
                <p>+52 1 55 1552 0105</p>
                <p>Sierra Gorda No. 36, Despacho 305 MZ,</p>
                <p>Col. Lomas de Chapultepec I Sección,</p>
                <p>Alcaldía Miguel Hidalgo, C.P. 11000, CDMX</p>
              </div>
            </div>
            <div className="relative z-10 bg-gradient-to-br from-kroniq-purple to-kroniq-dark rounded-lg p-8 text-white flex flex-col justify-center">
              <p className="text-lg leading-relaxed mb-4">
                {t('contact.vision')}
              </p>
              <p className="text-kroniq-green font-semibold text-lg">
                {t('contact.vision2')}
              </p>
            </div>
          </div>

          {/* Sección final - Patrón diagonal */}
          <div className="relative text-center py-12 bg-kroniq-cream rounded-lg overflow-hidden">
            <div className="absolute inset-0 triangle-pattern-diagonal" />
            <div className="relative z-10">
              <h2 className="text-3xl font-patua text-gray-900 mb-4">
                {t('contact.designDrives')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t('contact.designDrivesDesc')}
              </p>
              <Link
                href="/personalizado-2"
                className="inline-block bg-kroniq-green text-kroniq-dark hover:bg-kroniq-green/80 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                {t('shop.payCustom')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}