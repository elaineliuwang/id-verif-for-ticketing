'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  IdCard,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { runMockVerification, wait } from '@/lib/mockVerification';
import { useVerification } from '@/lib/verification-context';

const stepConfig = [
  {
    title: 'Upload Photo ID',
    description: 'Government-issued ID (front only)',
    icon: IdCard
  },
  {
    title: 'Capture Selfie',
    description: 'Match your identity in real-time',
    icon: Camera
  },
  {
    title: 'VerifID Review',
    description: 'Token issued in under a minute',
    icon: ShieldCheck
  }
];

export const VerificationSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { setVerified } = useVerification();

  const handleContinue = async () => {
    if (isComplete) return;
    setIsLoading(true);

    if (currentStep < stepConfig.length - 1) {
      await wait(800);
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
      return;
    }

    const result = await runMockVerification();
    setToken(result.token);
    setVerified(result.token);
    setIsComplete(true);
    setIsLoading(false);
  };

  return (
    <div className="relative mx-auto max-w-3xl rounded-3xl bg-white/90 p-8 shadow-card ring-1 ring-black/5 backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-3">
        {stepConfig.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isDone = index < currentStep || isComplete;

          return (
            <div
              key={step.title}
              className={`flex flex-col gap-3 rounded-2xl border px-5 py-6 transition ${
                isActive
                  ? 'border-fair-blue bg-fair-blue/5'
                  : isDone
                    ? 'border-emerald-200 bg-emerald-50/60'
                    : 'border-transparent bg-fair-blue/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isActive
                      ? 'bg-fair-blue text-white'
                      : isDone
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-fair-blue'
                  } shadow shadow-fair-blue/20`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fair-navy">{step.title}</p>
                  <p className="text-xs text-fair-navy/60">{step.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 space-y-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-dashed border-fair-blue/40 bg-fair-blue/5 p-6 text-sm text-fair-navy/80"
        >
          {currentStep === 0 && (
            <p>
              Drag and drop or <span className="font-semibold text-fair-blue">select an image</span> of your government ID.
              VerifID only stores a cryptographic token Ticketmaster can reference, never your documents.
            </p>
          )}
          {currentStep === 1 && (
            <p>
              Center your face within the frame and blink twice. We ensure the selfie matches your ID to block bots and duplicate accounts.
            </p>
          )}
          {currentStep === 2 && (
            <p>
              Our verification partners are issuing your VerifID token. Ticketmaster will trust it at checkout in under 60 seconds.
            </p>
          )}
        </motion.div>

        <button
          onClick={handleContinue}
          disabled={isLoading || isComplete}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-fair-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fair-blue/30 transition hover:bg-fair-blue/90 disabled:cursor-not-allowed disabled:bg-fair-blue/40"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isComplete ? 'You’re Verified!' : currentStep === stepConfig.length - 1 ? 'Complete Verification' : 'Continue'}
        </button>
      </div>

      <AnimatePresence>
        {isComplete && token && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-x-6 -bottom-20 rounded-3xl border border-fair-blue/30 bg-white p-6 shadow-xl shadow-fair-blue/20"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-fair-blue/10 p-3 text-fair-blue">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-fair-navy">You’re Verified!</p>
                <p className="text-sm text-fair-navy/70">
                  Ticketmaster can now trust your identity. Your VerifID Token:
                  <span className="ml-2 font-mono text-fair-blue">{token}</span>
                </p>
              </div>
              <Sparkles className="ml-auto h-6 w-6 text-fair-blue" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


