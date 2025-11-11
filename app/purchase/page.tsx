'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { featuredEvents } from '@/lib/mockData';
import { PurchaseSummary } from '@/components/PurchaseSummary';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { useVerification } from '@/lib/verification-context';

export default function PurchasePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get('eventId');
  const { isVerified } = useVerification();

  const event = useMemo(
    () => featuredEvents.find((item) => item.id === eventId) ?? featuredEvents[0],
    [eventId]
  );

  return (
    <div className="relative overflow-hidden pb-24 pt-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/10 to-white" />
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between">
          <Link
            href={`/queue?eventId=${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-fair-blue transition hover:text-fair-blue/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to queue
          </Link>

          <button
            onClick={() => router.push('/events')}
            className="rounded-full border border-fair-blue/40 px-4 py-2 text-xs font-semibold text-fair-blue transition hover:border-fair-blue"
          >
            Explore more events
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col gap-4"
        >
          <h1 className="text-3xl font-semibold text-fair-navy">Secure your Ticketmaster seats</h1>
          <p className="text-sm text-fair-navy/70">
            Checkout with Ticketmaster while VerifID enforces fair limits. Every ticket is bound to a trusted, unique identity.
          </p>
          <VerifiedBadge />
        </motion.div>
      </div>

      <div className="mt-12 px-6">
        <PurchaseSummary event={event} />
      </div>
    </div>
  );
}


