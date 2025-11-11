'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { VerificationSteps } from '@/components/VerificationSteps';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { useVerification } from '@/lib/verification-context';

export default function VerifyPage() {
  const { isVerified } = useVerification();

  return (
    <div className="relative overflow-hidden pb-24 pt-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/10 to-white" />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-fair-blue transition hover:text-fair-blue/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to VerifID
        </Link>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-fair-navy"
          >
            Verify once, unlock Ticketmaster priority forever.
          </motion.h1>
          <p className="max-w-2xl text-sm text-fair-navy/70">
            Upload your government ID, snap a quick selfie, and we’ll issue a secure VerifID token. Ticketmaster reads the token to keep bots out—no personal documents stored, just proof you’re a real fan.
          </p>
          <VerifiedBadge />
        </div>
      </div>

      <div className="mt-10 px-6">
        <VerificationSteps />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-32 flex max-w-3xl items-center gap-4 rounded-3xl bg-fair-blue/10 px-6 py-5 text-sm text-fair-blue"
      >
        <ShieldCheck className="h-5 w-5" />
        <p>
          Ticketmaster pilots show a 92% reduction in bot purchases with VerifID tokens. We only store a secure hash—never your documents.
        </p>
      </motion.div>
    </div>
  );
}


