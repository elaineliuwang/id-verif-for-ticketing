'use client';

import { VerificationProvider } from '@/lib/verification-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <VerificationProvider>{children}</VerificationProvider>;
}


