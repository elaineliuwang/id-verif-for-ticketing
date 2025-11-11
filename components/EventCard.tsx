'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { EventItem } from '@/lib/mockData';
import { useVerification } from '@/lib/verification-context';

type EventCardProps = {
  event: EventItem;
  index: number;
};

export const EventCard = ({ event, index }: EventCardProps) => {
  const { isVerified } = useVerification();

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white/80 p-6 shadow-card ring-1 ring-black/5 backdrop-blur"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-fair-blue/5">
        <Image
          src={event.heroImage}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="mt-5 flex-1">
        <h3 className="text-lg font-semibold text-fair-navy">{event.name}</h3>
        <p className="mt-2 text-sm font-medium text-fair-blue">{event.date}</p>
        <p className="mt-1 text-sm text-fair-navy/70">{event.venue}</p>
        <p className="mt-3 text-sm text-fair-navy/70">{event.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-fair-blue/5 px-4 py-3 text-sm text-fair-navy/70">
        <span>Price Range</span>
        <span className="font-semibold text-fair-navy">{event.priceRange}</span>
      </div>

      <Link
        href={`/queue?eventId=${event.id}`}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-inner shadow-fair-blue/20 transition ${
          isVerified
            ? 'bg-fair-blue text-white hover:bg-fair-blue/90'
            : 'bg-white text-fair-blue ring-1 ring-fair-blue/40 hover:ring-fair-blue/80'
        }`}
      >
        <Users className="h-4 w-4" />
        {isVerified ? 'Priority Queue Access' : 'Join Queue'}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
};


