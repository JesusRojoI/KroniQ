import type { Metadata } from 'next';
import { Patua_One, Urbanist } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const patua = Patua_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-patua',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'KroniQ - Estudio Creativo',
  description: 'Creamos marcas, elementos visuales y experiencias digitales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${patua.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <body className="font-urbanist bg-kroniq-cream" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}