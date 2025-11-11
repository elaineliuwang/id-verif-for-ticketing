'use client';

import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { featuredEvents } from '@/lib/mockData';
import { EventCard } from '@/components/EventCard';
import { useVerification } from '@/lib/verification-context';

export default function EventsPage() {
  const { isVerified } = useVerification();

  return (
    <div className="relative overflow-hidden pb-20 pt-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/5 to-white" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-semibold text-fair-navy"
            >
              Ticketmaster events powered by VerifID
            </motion.h1>
            <p className="mt-2 text-sm text-fair-navy/70">
              {isVerified
                ? 'You’re synced with VerifID. Jump into Ticketmaster priority queues for these marquee drops.'
                : 'Verify once to let Ticketmaster recognize you as a trusted fan and prioritize your spot in line.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-fair-navy shadow shadow-fair-blue/10 ring-1 ring-fair-blue/30 transition hover:ring-fair-blue/60">
              <Search className="h-4 w-4" />
              Search events
            </button>
            <button className="flex items-center gap-2 rounded-full border border-fair-blue/30 px-4 py-2 text-sm font-semibold text-fair-blue transition hover:border-fair-blue">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


