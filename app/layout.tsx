import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'VerifID | Trusted Identity Layer for Ticketmaster',
  description:
    'VerifID shows how verified identities plug into Ticketmaster to keep high-demand drops authentic and fair.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-fair-gray text-fair-navy">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-white/70 py-6 text-center text-sm text-fair-navy/70 shadow-inner backdrop-blur">
              Built for MIT 6.1850 · VerifID x Ticketmaster MVP
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}


