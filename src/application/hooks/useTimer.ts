/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TICK_INTERVAL, TICK_DECREMENT, EASING_EXPONENT, GROWTH_THRESHOLD, GROWTH_WINDOW } from '../../domain/constants';

export const useTimer = (easingMode: boolean) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback((seconds: number) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setIsRunning(true);
  }, []);

  const toggleTimer = useCallback(() => {
    if (timeLeft <= 0) return;
    setIsRunning((prev) => !prev);
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setTotalTime(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= TICK_DECREMENT) {
            setIsRunning(false);
            return 0;
          }
          return prev - TICK_DECREMENT;
        });
      }, TICK_INTERVAL);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const progress = useMemo(() => {
    if (totalTime === 0) return 0;
    const linearProgress = (totalTime - timeLeft) / totalTime;
    
    if (!easingMode) {
      return Math.min(1, Math.max(0, linearProgress));
    }

    // Dynamic exponent: scales with total time to ensure longer timers 
    // still feel aggressive in the first few seconds.
    // Reduced aggressiveness: totalTime / 180 instead of 60.
    const dynamicExponent = Math.max(EASING_EXPONENT, totalTime / 180);
    return Math.min(1, 1 - Math.pow(1 - linearProgress, dynamicExponent));
  }, [timeLeft, totalTime, easingMode]);

  const goalScale = useMemo(() => {
    if (totalTime === 0) return 0.5;
    const linearProgress = (totalTime - timeLeft) / totalTime;
    
    if (linearProgress < GROWTH_THRESHOLD) return 0.5;
    
    const growthFactor = (linearProgress - GROWTH_THRESHOLD) / GROWTH_WINDOW;
    return 0.5 + (0.5 * Math.min(1, growthFactor));
  }, [timeLeft, totalTime]);

  const isFinished = useMemo(() => totalTime > 0 && timeLeft <= 0 && !isRunning, [totalTime, timeLeft, isRunning]);

  return {
    timeLeft,
    totalTime,
    isRunning,
    isFinished,
    progress,
    goalScale,
    startTimer,
    toggleTimer,
    resetTimer,
  };
};
