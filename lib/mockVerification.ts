export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generateMockToken = () => {
  return Array.from({ length: 6 })
    .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('');
};

export const runMockVerification = async () => {
  await wait(1200);
  await wait(900);
  const token = `FTK-${generateMockToken()}`;
  return {
    token,
    completedAt: new Date().toISOString()
  };
};
