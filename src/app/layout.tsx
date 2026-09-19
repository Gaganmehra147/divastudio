import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

const serifFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DIVASTUDIO | Luxury Editorial Photography Atelier',
  description: 'Stories Worth Remembering. International fine art and editorial photography studio dedicated to timeless human connection, emotion, and architectural beauty.',
  keywords: ['Luxury photography', 'Editorial wedding photographer', 'Fine art portraiture', 'Maternity photography', 'DIVASTUDIO', 'High fashion lookbook'],
  openGraph: {
    title: 'DIVASTUDIO | Fine Art & Editorial Photography',
    description: 'Timeless photographs created with intention, emotion, and architectural stillness.',
    url: 'https://divastudio.com',
    siteName: 'DIVASTUDIO',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'DIVASTUDIO Fine Art Photography',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1918]">
        {/* Subtle organic film grain texture overlay */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Contextual custom desktop cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Editorial Footer */}
        <Footer />
      </body>
    </html>
  );
}
