'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Tickets, CheckCircle2, AlertTriangle } from 'lucide-react';
import { EventItem } from '@/lib/mockData';
import { useVerification } from '@/lib/verification-context';

type PurchaseSummaryProps = {
  event: EventItem;
};

const BASE_PRICE = 189;

export const PurchaseSummary = ({ event }: PurchaseSummaryProps) => {
  const { isVerified } = useVerification();
  const maxTickets = isVerified ? 2 : 1;
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const priceBreakdown = useMemo(() => {
    const subtotal = BASE_PRICE * quantity;
    const fees = subtotal * 0.12;
    const total = subtotal + fees;
    return { subtotal, fees, total };
  }, [quantity]);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      return Math.min(Math.max(1, next), maxTickets);
    });
  };

  const simulatePurchase = async () => {
    setIsPurchasing(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setIsPurchasing(false);
    setIsComplete(true);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-fair-navy">Select Your Tickets</h2>
          <p className="mt-2 text-sm text-fair-navy/70">
            {isVerified
              ? 'Ticketmaster sees your VerifID token, so you can secure up to 2 seats in this drop.'
              : 'Complete VerifID to unlock additional tickets and faster future queues on Ticketmaster.'}
          </p>
        </div>

        <div className="rounded-2xl border border-fair-blue/20 bg-fair-blue/5 p-6">
          <div className="flex items-center gap-3">
            <Tickets className="h-6 w-6 text-fair-blue" />
            <div>
              <p className="text-lg font-semibold text-fair-navy">{event.name}</p>
              <p className="text-sm text-fair-navy/70">{event.date}</p>
              <p className="text-sm text-fair-navy/70">{event.venue}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-fair-blue/20 bg-white/80 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-fair-navy">Tickets</p>
            <p className="text-xs text-fair-navy/60">Max {maxTickets} per verified identity</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fair-blue/40 text-lg text-fair-blue transition hover:border-fair-blue"
            >
              –
            </button>
            <span className="w-8 text-center text-lg font-semibold text-fair-navy">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fair-blue/40 text-lg text-fair-blue transition hover:border-fair-blue"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={simulatePurchase}
          disabled={isPurchasing || isComplete}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-fair-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fair-blue/30 transition hover:bg-fair-blue/90 disabled:cursor-not-allowed disabled:bg-fair-blue/40"
        >
          <CreditCard className="h-5 w-5" />
          {isComplete ? 'Purchase Complete' : isPurchasing ? 'Processing...' : 'Purchase on Ticketmaster'}
        </button>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-6 py-4 text-sm text-emerald-800"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Purchase Successful</p>
                  <p>Your Ticketmaster tickets are confirmed. Check your email for the receipt and QR codes.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4 rounded-2xl border border-fair-blue/20 bg-white/80 p-6">
        <h3 className="text-lg font-semibold text-fair-navy">Order Summary</h3>
        <div className="space-y-3 text-sm text-fair-navy/70">
          <div className="flex justify-between">
            <span>Reserved Seats</span>
            <span>Section 112 · Row G</span>
          </div>
          <div className="flex justify-between">
            <span>Price per ticket</span>
            <span>${BASE_PRICE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${priceBreakdown.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Identity assurance fee</span>
            <span>${priceBreakdown.fees.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-dashed border-fair-blue/30 pt-4 text-sm font-semibold text-fair-navy">
          <span>Total due</span>
          <span>${priceBreakdown.total.toFixed(2)}</span>
        </div>

        {!isVerified && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <p>Unverified fans can purchase one ticket per drop. Connect VerifID to unlock Ticketmaster priority queues and fair limits.</p>
          </div>
        )}
      </div>
    </div>
  );
};


