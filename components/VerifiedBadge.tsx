'use client';

import { ShieldCheck } from 'lucide-react';
import { useVerification } from '@/lib/verification-context';

type VerifiedBadgeProps = {
  subtle?: boolean;
};

export const VerifiedBadge = ({ subtle = false }: VerifiedBadgeProps) => {
  const { isVerified, verificationToken } = useVerification();

  if (!isVerified) return null;

  const wrapperStyles = subtle
    ? 'bg-fair-blue/10 px-2 py-0.5 text-xs text-fair-blue'
    : 'bg-fair-blue px-3 py-1 text-sm text-white';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold shadow shadow-fair-blue/30 ${wrapperStyles}`}>
      <ShieldCheck className={`h-3.5 w-3.5 ${subtle ? 'text-fair-blue' : 'text-white'}`} />
      <span className={subtle ? 'text-fair-blue' : 'text-white'}>
        VerifID{!subtle && verificationToken ? ` · ${verificationToken}` : ''}
      </span>
    </span>
  );
};


