'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Timer, Zap } from 'lucide-react';
import { wait } from '@/lib/mockVerification';
import { useVerification } from '@/lib/verification-context';
import { getQueueEstimate } from '@/lib/mockQueue';

type QueueSimulatorProps = {
  eventName: string;
  onReady?: () => void;
};

export const QueueSimulator = ({ eventName, onReady }: QueueSimulatorProps) => {
  const { isVerified } = useVerification();
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState(4500);
  const [status, setStatus] = useState<'waiting' | 'advancing' | 'ready'>('waiting');

  const estimate = useMemo(() => getQueueEstimate(isVerified), [isVerified]);

  useEffect(() => {
    let isCancelled = false;
    const runSimulation = async () => {
      for (let i = 0; i <= estimate.steps; i++) {
        if (isCancelled) return;
        const stepProgress = Math.min(100, Math.round((i / estimate.steps) * 100));
        const positionLeft = Math.max(0, Math.round(estimate.initialPosition * (1 - i / estimate.steps)));
        setProgress(stepProgress);
        setPosition(positionLeft);
        setStatus(i === 0 ? 'waiting' : i === estimate.steps ? 'ready' : 'advancing');
        await wait(estimate.delay);
      }
    };
    runSimulation();
    return () => {
      isCancelled = true;
    };
  }, [estimate]);

  useEffect(() => {
    if (status === 'ready' && onReady) {
      const timer = setTimeout(() => {
        onReady();
      }, 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [onReady, status]);

  return (
    <div className="relative mx-auto max-w-2xl space-y-6 rounded-3xl bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-fair-blue" />
        <div>
          <p className="text-lg font-semibold text-fair-navy">You’re in line for {eventName}</p>
          <p className="text-sm text-fair-navy/70">
            {isVerified
              ? 'Ticketmaster recognizes your VerifID token—enjoy the 3× speed boost through the queue.'
              : 'Connect VerifID so Ticketmaster can prioritize you over bots and duplicate accounts.'}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-fair-navy/60">
          <span>Queue Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-fair-blue/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            className={`h-full rounded-full ${isVerified ? 'bg-fair-blue' : 'bg-fair-blue/70'}`}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-fair-blue/20 bg-fair-blue/5 px-5 py-4 text-sm text-fair-navy/70">
        Estimated wait time:{' '}
        <span className="font-semibold text-fair-navy">{estimate.waitLabel}</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-fair-blue/20 bg-white/80 px-4 py-4 text-sm text-fair-navy/80">
          <p className="font-semibold text-fair-navy">Your queue position</p>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={position}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-2 text-2xl font-semibold text-fair-blue"
            >
              {position.toLocaleString()}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-fair-blue/20 bg-white/80 px-4 py-4 text-sm text-fair-navy/80">
          <p className="font-semibold text-fair-navy">Status</p>
          <div className="mt-2 flex items-center gap-2 text-fair-navy">
            {status === 'waiting' && <Timer className="h-5 w-5 text-amber-500" />}
            {status === 'advancing' && <Zap className="h-5 w-5 text-fair-blue" />}
            {status === 'ready' && <Zap className="h-5 w-5 text-emerald-500" />}
            <span className="capitalize">{status.replace('-', ' ')}</span>
          </div>
        </div>
      </div>

      {status === 'ready' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50/70 px-5 py-4 text-sm text-emerald-800"
        >
          You're up! Ticketmaster is routing you to checkout.
        </motion.div>
      )}
    </div>
  );
};


