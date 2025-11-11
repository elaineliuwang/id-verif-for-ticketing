'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { featuredEvents } from '@/lib/mockData';
import { QueueSimulator } from '@/components/QueueSimulator';

export default function QueuePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get('eventId');

  const event = useMemo(
    () => featuredEvents.find((item) => item.id === eventId) ?? featuredEvents[0],
    [eventId]
  );

  return (
    <div className="relative overflow-hidden pb-24 pt-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/10 to-white" />

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
        <div className="flex items-center justify-between">
          <Link
            href={`/events`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-fair-blue transition hover:text-fair-blue/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>
          <button
            onClick={() => router.push(`/purchase?eventId=${event.id}`)}
            className="inline-flex items-center gap-2 rounded-full bg-fair-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fair-blue/30 transition hover:bg-fair-blue/90"
          >
            Continue to purchase
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-fair-blue">
            Ticketmaster Queue Simulation
          </p>
          <h1 className="text-3xl font-semibold text-fair-navy">{event.name}</h1>
          <p className="text-sm text-fair-navy/70">
            Ticketmaster checks VerifID tokens before letting fans into checkout. Watch how trusted identities accelerate your progress while bots stall out.
          </p>
        </motion.div>
      </div>

      <div className="mt-12 px-6">
        <QueueSimulator
          eventName={event.name}
          onReady={() => router.push(`/purchase?eventId=${event.id}`)}
        />
      </div>
    </div>
  );
}


