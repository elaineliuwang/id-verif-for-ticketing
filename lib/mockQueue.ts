type QueueEstimate = {
  initialPosition: number;
  steps: number;
  delay: number;
  waitLabel: string;
};

export const getQueueEstimate = (isVerified: boolean): QueueEstimate => {
  if (isVerified) {
    return {
      initialPosition: 1200,
      steps: 10,
      delay: 450,
      waitLabel: '≈ 2 minutes remaining'
    };
  }

  return {
    initialPosition: 4800,
    steps: 16,
    delay: 720,
    waitLabel: '≈ 8–10 minutes remaining'
  };
};


