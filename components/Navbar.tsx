'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ticket, ShieldCheck, CircleUser, LifeBuoy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useVerification } from '@/lib/verification-context';
import { VerifiedBadge } from './VerifiedBadge';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'My Account', href: '/account' },
  { label: 'Help', href: '/help', disabled: true }
];

export const Navbar = () => {
  const pathname = usePathname();
  const { isVerified } = useVerification();

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-semibold tracking-tight text-fair-blue"
        >
          <Ticket className="h-6 w-6" strokeWidth={2.2} />
          <span className="flex items-baseline gap-2">
            <span>Ticketmaster</span>
            <span className="rounded-full bg-fair-blue/10 px-2 py-0.5 text-xs font-medium text-fair-blue">
              powered by VerifID
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href !== '/help' && (pathname === item.href || pathname.startsWith(item.href + '/'));
            const isDisabled = Boolean(item.disabled);

            return (
              <Link
                key={item.label}
                href={isDisabled ? '#' : item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isDisabled
                    ? 'cursor-not-allowed text-fair-navy/30'
                    : isActive
                      ? 'text-fair-blue'
                      : 'text-fair-navy/70 hover:text-fair-blue'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-fair-blue/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
                {item.href === '/account' && isVerified && (
                  <span className="ml-2 align-middle">
                    <VerifiedBadge subtle />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/verify"
            className="group flex items-center gap-2 rounded-full bg-fair-blue px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fair-blue/20 transition hover:shadow-fair-blue/40"
          >
            <ShieldCheck className="h-4 w-4 transition-transform group-hover:scale-105" />
            Get Verified
          </Link>
          <Link
            href="/account"
            className="flex items-center gap-2 rounded-full border border-fair-blue/30 px-4 py-2 text-sm font-semibold text-fair-navy transition hover:border-fair-blue hover:text-fair-blue"
          >
            <CircleUser className="h-5 w-5" />
            Account
          </Link>
        </div>
      </div>
    </header>
  );
};


