'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

const countries = [
  'México', 'Estados Unidos', 'Canadá', 'Argentina', 'Brasil', 'Chile', 'Colombia',
  'Perú', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Costa Rica',
  'Panamá', 'Guatemala', 'Honduras', 'Nicaragua', 'El Salvador', 'República Dominicana',
  'Puerto Rico', 'España', 'Francia', 'Alemania', 'Italia', 'Portugal', 'Reino Unido',
  'Irlanda', 'Países Bajos', 'Bélgica', 'Suiza', 'Austria', 'Suecia', 'Noruega',
  'Dinamarca', 'Finlandia', 'Polonia', 'República Checa', 'Rumania', 'Grecia',
  'Turquía', 'Rusia', 'China', 'Japón', 'Corea del Sur', 'India', 'Australia',
  'Nueva Zelanda', 'Sudáfrica', 'Egipto'
].sort();

const mexicanStates = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Guanajuato',
  'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit',
  'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
  'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

export default function CheckoutPage() {
  const { t } = useTranslation('common');
  const { currentLanguage } = useLanguage();
  const { items, subtotal, tax, total, clearCart } = useCart();
  const router = useRouter();

  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'México',
    address1: '',
    address2: '',
    city: '',
    state: 'Ciudad de México',
    postalCode: '',
    phone: '',
    email: '',
    orderNotes: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Función para obtener el nombre traducido del producto
    // Función para obtener el nombre traducido del producto
  const getProductName = (item: any) => {
    if (item.isCustom) {
      const customLabel = t('custom.title');
      return `${customLabel} - ${item.quoteId || ''}`;
    }
    if (item.nameKey) {
      return t(`products.${item.nameKey}`);
    }
    return item.name;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'expiryMonth' || name === 'expiryYear') {
      const cleaned = value.replace(/\D/g, '').slice(0, 2);
      setFormData({ ...formData, [name]: cleaned });
    } else if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: cleaned });
    } else if (name === 'postalCode') {
      const cleaned = value.replace(/\D/g, '').slice(0, 5);
      setFormData({ ...formData, [name]: cleaned });
    } else if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (formData.firstName.length < 3) {
      newErrors.firstName = t('checkout.firstNameError');
    }
    if (formData.lastName.length < 3) {
      newErrors.lastName = t('checkout.lastNameError');
    }
    if (formData.address1.length < 3) {
      newErrors.address1 = t('checkout.addressError');
    }
    if (formData.city.length < 3) {
      newErrors.city = t('checkout.cityError');
    }
    if (formData.postalCode.length !== 5) {
      newErrors.postalCode = t('checkout.postalError');
    }
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = t('checkout.phoneError');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('checkout.emailError');
    }
    if (formData.cardName.length < 1) {
      newErrors.cardName = t('checkout.cardNameError');
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = t('checkout.cardNumberError');
    }
    const month = parseInt(formData.expiryMonth);
    const year = parseInt(formData.expiryYear);
    if (!month || month < 1 || month > 12 || !year) {
      newErrors.expiry = t('checkout.expiryError');
    }
    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
      newErrors.cvv = t('checkout.cvvError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    setCouponError(t('checkout.invalidCoupon'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);
    setPaymentError('');

    try {
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const [expiryMonth, expiryYear] = [formData.expiryMonth, formData.expiryYear];

      const paymentData = {
        amount: total,
        orderId: orderId,
        cardData: {
          number: formData.cardNumber,
          name: formData.cardName,
          month: expiryMonth,
          year: `20${expiryYear}`,
          cvv: formData.cvv,
        },
        customer: {
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          telefono: formData.phone || '0000000000',
          direccion: formData.address1,
          direccion2: formData.address2,
          ciudad: formData.city,
          estado: formData.state,
          pais: 'MX',
          cp: formData.postalCode,
        },
      };

      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (result.success) {
        const orderData = {
          nombre: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          productos: items.map(item => ({
            nombre: getProductName(item),
            nameKey: item.nameKey,
            cantidad: item.quantity,
            precio: item.price,
            isCustom: item.isCustom,
          })),
          subtotal,
          impuesto: tax,
          total,
          transactionId: result.orderId || orderId,
        };

        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'order',
            to: formData.email,
            orderData,
            language: currentLanguage,
          }),
        });

        sessionStorage.setItem('lastOrder', JSON.stringify({
          ...orderData,
          orderId: result.orderId || orderId,
        }));

        clearCart();
        router.push('/compra-exitosa');
      } else {
        setPaymentError(result.error || t('checkout.paymentError'));
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(t('checkout.paymentError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-24 relative">
        <div className="fixed inset-0 triangle-pattern-spiral opacity-3 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-patua text-gray-900 mb-12">
            {t('checkout.title')}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-8">{t('cart.empty')}</p>
              <Link href="/tienda" className="inline-block bg-kroniq-purple text-white font-semibold py-3 px-8 rounded-lg">
                {t('cart.shopNow')}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna izquierda */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Cupón */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <button
                      type="button"
                      onClick={() => setShowCoupon(!showCoupon)}
                      className="text-kroniq-purple font-semibold hover:text-kroniq-purple/80"
                    >
                      {t('checkout.coupon')}
                    </button>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('checkout.clickCoupon')}
                    </p>
                    {showCoupon && (
                      <div className="mt-4 flex gap-3">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder={t('checkout.couponPlaceholder')}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kroniq-purple"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors"
                        >
                          {t('checkout.applyCoupon')}
                        </button>
                      </div>
                    )}
                    {couponError && <p className="text-red-500 text-sm mt-2">{couponError}</p>}
                  </div>

                  {/* Detalles de facturación */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-patua text-gray-900 mb-6">
                      {t('checkout.billingDetails')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.firstName')}
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.lastName')}
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.country')}
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kroniq-purple"
                        >
                          {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.streetAddress')}
                        </label>
                        <input
                          type="text"
                          name="address1"
                          value={formData.address1}
                          onChange={handleInputChange}
                          placeholder={t('checkout.streetPlaceholder')}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.address1 ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          name="address2"
                          value={formData.address2}
                          onChange={handleInputChange}
                          placeholder={t('checkout.apartment')}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kroniq-purple"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.city')}
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.state')}
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kroniq-purple"
                        >
                          {mexicanStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.postalCode')}
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.phone')}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.email')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.orderNotes')}
                        </label>
                        <textarea
                          name="orderNotes"
                          value={formData.orderNotes}
                          onChange={handleInputChange}
                          maxLength={250}
                          rows={3}
                          placeholder={t('checkout.notesPlaceholder')}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kroniq-purple resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Datos de tarjeta */}
                  <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                      <svg width="96" height="96" viewBox="0 0 96 96">
                        <polygon points="48,3 93,93 3,93" fill="#b0ffb0"/>
                      </svg>
                    </div>
                    
                    <h2 className="text-xl font-patua text-gray-900 mb-6">
  {t('checkout.cardTitle')}
</h2>

<div className="flex items-center space-x-4 mb-6 p-4 bg-kroniq-cream rounded-lg">
  <Image
    src="/keycop.png"
    alt="Keycop"
    width={120}
    height={40}
    className="h-10 w-auto object-contain"
  />
  <div className="flex items-center space-x-2">
    <Image
      src="/secure.svg"
      alt="Secure"
      width={24}
      height={24}
      className="h-6 w-auto"
    />
    <span className="text-sm text-gray-600 font-medium">
      {t('checkout.cardSubtitle')}
    </span>
  </div>
</div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.cardName')}
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder={t('checkout.cardNamePlaceholder')}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                        />
                        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('checkout.cardNumber')}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder={t('checkout.cardNumberPlaceholder')}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
                            <Image src="/visa.svg" alt="Visa" width={32} height={20} className="h-5 w-auto" />
                            <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto" />
                          </div>
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('checkout.expiry')}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="expiryMonth"
                              value={formData.expiryMonth}
                              onChange={handleInputChange}
                              placeholder="MM"
                              maxLength={2}
                              className={`w-20 px-4 py-3 rounded-lg border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple text-center`}
                            />
                            <span className="flex items-center text-gray-400">/</span>
                            <input
                              type="text"
                              name="expiryYear"
                              value={formData.expiryYear}
                              onChange={handleInputChange}
                              placeholder="AA"
                              maxLength={2}
                              className={`w-20 px-4 py-3 rounded-lg border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple text-center`}
                            />
                          </div>
                          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('checkout.cvv')}
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder={t('checkout.cvvPlaceholder')}
                              maxLength={4}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-kroniq-purple`}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Image
                                src="/secure.svg"
                                alt="CVV"
                                width={20}
                                height={20}
                                className="h-5 w-auto opacity-50"
                              />
                            </div>
                          </div>
                          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha - Resumen */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
                    <h2 className="text-2xl font-patua text-gray-900 mb-6">
                      {t('checkout.yourOrder')}
                    </h2>
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {getProductName(item)} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
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
                      <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-gray-900">{t('cart.total')}</span>
                        <span className="text-2xl font-bold text-kroniq-purple">
                          ${total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      {t('checkout.privacyNotice')}{' '}
                      <a href="/politica-privacidad" className="text-kroniq-purple hover:underline">
                        {t('checkout.privacyPolicy')}
                      </a>
                    </p>
                    {paymentError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {paymentError}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-kroniq-purple hover:bg-kroniq-purple/90 text-white font-semibold py-4 rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? <Spinner size="sm" /> : t('checkout.placeOrder')}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}