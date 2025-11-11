'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, RefreshCw, XCircle } from 'lucide-react';
import { mockUser } from '@/lib/mockData';
import { useVerification } from '@/lib/verification-context';
import { VerifiedBadge } from '@/components/VerifiedBadge';

export default function AccountPage() {
  const { isVerified, resetVerification } = useVerification();

  return (
    <div className="relative overflow-hidden pb-24 pt-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/10 to-white" />
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-fair-blue transition hover:text-fair-blue/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md shadow-fair-blue/30">
                <Image src={mockUser.avatarUrl} alt={mockUser.name} fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-fair-navy">{mockUser.name}</h1>
                <p className="text-sm text-fair-navy/70">{mockUser.email}</p>
                <div className="mt-3">
                  <VerifiedBadge />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-full bg-fair-blue px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fair-blue/30 transition hover:bg-fair-blue/90"
              >
                <ShieldCheck className="h-4 w-4" />
                {isVerified ? 'Reverify' : 'Get Verified'}
              </Link>
              {isVerified && (
                <button
                  onClick={resetVerification}
                  className="inline-flex items-center gap-2 rounded-full border border-fair-blue/40 px-4 py-2 text-sm font-semibold text-fair-blue transition hover:border-fair-blue"
                >
                  <XCircle className="h-4 w-4" />
                  Remove Verification
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-fair-blue/20 bg-fair-blue/5 px-5 py-6 text-sm text-fair-navy/70">
              <p className="text-sm font-semibold text-fair-navy">VerifID benefits</p>
              <ul className="mt-3 space-y-2">
                <li>• Ticketmaster queues prioritize trusted fans</li>
                <li>• Fair purchase caps enforced automatically</li>
                <li>• One identity across partnered venues</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-fair-blue/20 bg-white/80 px-5 py-6 text-sm text-fair-navy/70">
              <p className="text-sm font-semibold text-fair-navy">Verification status</p>
              <p className="mt-3">
                {isVerified
                  ? 'Your VerifID token is active. Ticketmaster references it to keep resale rings out while protecting your privacy.'
                  : 'You have not completed verification yet. Finish VerifID once to unlock Ticketmaster priority queues and secure purchasing.'}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-fair-blue">
                <RefreshCw className="h-4 w-4" />
                Tokens refresh every Ticketmaster drop to prevent fraud.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


