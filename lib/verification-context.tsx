'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type VerificationContextValue = {
  isVerified: boolean;
  verificationToken: string | null;
  setVerified: (token: string) => void;
  resetVerification: () => void;
};

const VerificationContext = createContext<VerificationContextValue | undefined>(
  undefined
);

export const VerificationProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);

  const value = useMemo<VerificationContextValue>(
    () => ({
      isVerified,
      verificationToken,
      setVerified: (token: string) => {
        setIsVerified(true);
        setVerificationToken(token);
      },
      resetVerification: () => {
        setIsVerified(false);
        setVerificationToken(null);
      }
    }),
    [isVerified, verificationToken]
  );

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};
