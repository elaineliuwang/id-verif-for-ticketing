'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Sparkles, Globe, Ticket } from 'lucide-react';
import { useVerification } from '@/lib/verification-context';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { featuredEvents } from '@/lib/mockData';
import { EventCard } from '@/components/EventCard';

export default function LandingPage() {
  const { isVerified } = useVerification();
  const integrationSteps = [
    {
      title: 'Ticketmaster launch',
      description: 'Fans discover high-demand drops on Ticketmaster and opt into the fair queue.',
      icon: Globe
    },
    {
      title: 'Instant VerifID check',
      description: 'Ticketmaster requests a VerifID token to confirm one real fan per queue spot.',
      icon: ShieldCheck
    },
    {
      title: 'Priority checkout',
      description: 'Verified fans re-enter Ticketmaster with priority placement and equitable limits.',
      icon: Ticket
    }
  ];

  return (
    <div className="relative overflow-hidden pb-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-fair-blue/5 to-white" />
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-12 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fair-blue shadow shadow-fair-blue/20">
            <Sparkles className="h-4 w-4" />
            Ticketmaster · powered by VerifID
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-fair-navy md:text-5xl">
            Keep live events fair. <br /> Get VerifID today.
          </h1>
          <p className="text-base text-fair-navy/70">
            Tired of tickets getting sold out by scalpers and bots? VerifID runs a lightweight identity check so real, verified fans get priority. 
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/verify"
              className="group inline-flex items-center gap-2 rounded-full bg-fair-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fair-blue/30 transition hover:bg-fair-blue/90"
            >
              <ShieldCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
              {isVerified ? 'Reverify Identity' : 'Get Verified'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-fair-blue/40 px-6 py-3 text-sm font-semibold text-fair-blue transition hover:border-fair-blue hover:text-fair-blue"
            >
              Browse Events
            </Link>
          </div>

          <div className="flex items-center gap-3 text-xs text-fair-navy/60">
            <Users className="h-4 w-4 text-fair-blue" />
            Ticketmaster fans verified with VerifID get priority over scalpers and bots.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex-1"
        >
          <div className="absolute inset-0 -z-10 rounded-[32px] bg-fair-blue/20 blur-2xl" />
          <div className="flex flex-col gap-6 rounded-[32px] bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-fair-navy">Verification Status</p>
                <p className="text-xs text-fair-navy/60">
                  {isVerified ? 'Connected to Ticketmaster priority access.' : 'Not verified yet'}
                </p>
              </div>
              <VerifiedBadge />
            </div>
            <div className="rounded-2xl border border-dashed border-fair-blue/30 bg-fair-blue/5 px-5 py-4 text-sm text-fair-navy/70">
              <p className="font-semibold text-fair-navy">Why Ticketmaster needs VerifID</p>
              <p className="mt-2">
                Each verification issues a secure token Ticketmaster can trust across queues. No IDs stored—just proof that every entry belongs to a unique human.
              </p>
            </div>
            <div className="rounded-2xl bg-fair-blue/10 px-5 py-4 text-sm text-fair-blue">
              <p className="font-semibold">Drop Day Checklist</p>
              <ol className="mt-2 space-y-2">
                <li>1. Complete VerifID once.</li>
                <li>2. Rejoin Ticketmaster priority queues instantly.</li>
                <li>3. Checkout with equitable limits that stop bots.</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur"
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fair-blue">Integration Flow</p>
            <h2 className="text-2xl font-semibold text-fair-navy">How Ticketmaster integrates VerifID</h2>
            <p className="text-sm text-fair-navy/70">
              A lightweight identity layer sits between Ticketmaster’s queue and checkout, making sure every slot belongs to a real fan.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {integrationSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex flex-col gap-3 rounded-2xl border border-fair-blue/20 bg-fair-blue/5 px-5 py-6 text-sm text-fair-navy/80"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-fair-blue shadow shadow-fair-blue/20">
                    <StepIcon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold text-fair-navy">{step.title}</p>
                  <p className="text-xs text-fair-navy/70">{step.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-fair-navy">Events protected by VerifID</h2>
          <Link href="/events" className="text-sm font-semibold text-fair-blue hover:text-fair-blue/80">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}


