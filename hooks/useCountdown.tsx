import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initial: number = 60) {
  const [count, setCount] = useState(initial);
  const intervalRef = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    setCount(prev => {
      if (prev <= 1) {
        clear();
        return 0;
      }
      return prev - 1;
    });
  }, [clear]);

  const start = useCallback(() => {
    clear();
    intervalRef.current = window.setInterval(tick, 1000);
  }, [tick, clear]);

  const reset = useCallback(() => {
    setCount(initial);
    start();
  }, [initial, start]);

  useEffect(() => {
    start();
    return clear;
  }, [start, clear]);

  return { countdown: count, reset };
}