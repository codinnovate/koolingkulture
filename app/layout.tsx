import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KoolingKulture Engineering Services | HVAC Experts & Repairs',
  description: 'Professional HVAC systems, repairs, installation, and maintenance services. Expert engineering solutions for residential and commercial cooling and heating systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}