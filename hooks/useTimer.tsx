'use client';

import { useMemo, useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';

const useTimer = (timeInSecs: number, ellapseCB?: () => void) => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: timeInSecs,
    intervalMs: 1000,
  });
 
  const minutes = useMemo(() => Math.floor(count / 60), [count]);
  const seconds = useMemo(() => count % 60, [count]);

  useEffect(() => {
    if (count === 0) {
      ellapseCB?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return {
    count,
    minutes: minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    seconds: seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};

export { useTimer };
