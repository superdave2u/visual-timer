/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ThemeType, ThemeStyles } from '../../domain/types';
import { MicroText } from './MicroText';

interface TimerDisplayProps {
  theme: ThemeType;
  styles: ThemeStyles;
  progress: number;
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isFinished: boolean;
  showTimePassed: boolean;
  showTimeRemaining: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  theme,
  styles,
  progress,
  timeLeft,
  totalTime,
  isRunning,
  isFinished,
  showTimePassed,
  showTimeRemaining,
}) => {
  const formatTimeWithDecimals = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const centis = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
  };

  const timePassed = totalTime - timeLeft;

  return (
    <div className="absolute inset-0 z-0">
      {/* Centered Timers */}
      {(showTimePassed || showTimeRemaining) && totalTime > 0 && !isFinished && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            {showTimePassed && (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-widest mb-1 theme-text-muted">Passed</span>
                <span className="text-6xl font-mono font-black tabular-nums theme-text">
                  {formatTimeWithDecimals(timePassed)}
                </span>
              </div>
            )}
            {showTimeRemaining && (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-widest mb-1 theme-text-muted">Remaining</span>
                <span className="text-6xl font-mono font-black tabular-nums theme-text">
                  {formatTimeWithDecimals(timeLeft)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {theme === 'hourglass' ? (
        <div className="w-full h-full flex items-center justify-center p-12">
          <div className="relative w-full max-w-[280px] aspect-[1/2] flex flex-col items-center">
            {/* Top Bulb */}
            <div 
              className="w-full h-1/2 relative bg-slate-200/50 backdrop-blur-sm border-x-4 border-t-4 border-slate-800 rounded-t-full overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-amber-400"
                style={{ height: `${(1 - progress) * 100}%` }}
              />
            </div>

            {/* Middle Neck */}
            <div className="w-4 h-2 bg-slate-800 z-20" />

            {/* Bottom Bulb */}
            <div 
              className="w-full h-1/2 relative bg-slate-200/50 backdrop-blur-sm border-x-4 border-b-4 border-slate-800 rounded-b-full overflow-hidden"
              style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-amber-400"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            {/* Falling Sand Effect */}
            {isRunning && timeLeft > 0 && progress < 1 && (
              <motion.div
                className="absolute left-1/2 top-1/2 w-1 bg-amber-500 -translate-x-1/2 z-10"
                style={{ top: '50%', height: '48%' }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              />
            )}

            {/* Frame Accents */}
            <div className="absolute -top-4 left-0 right-0 h-4 bg-slate-800 rounded-full" />
            <div className="absolute -bottom-4 left-0 right-0 h-4 bg-slate-800 rounded-full" />

            {/* Pulsating Goal Icon for Hourglass */}
            {isFinished && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <motion.span 
                  className="text-9xl sticker-effect"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  🎉
                </motion.span>
              </div>
            )}
          </div>
        </div>
      ) : theme === 'circle' ? (
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-square">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="6" className="opacity-50" />
              <motion.circle
                cx="50" cy="50" r="45" fill="none"
                stroke={styles.fill}
                strokeWidth="6"
                strokeDasharray="282.7"
                animate={{ strokeDashoffset: 282.7 * (1 - progress) }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-9xl sticker-effect"
                animate={isFinished ? { scale: [1, 1.2, 1] } : {}}
                transition={isFinished ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}
              >
                {isFinished ? '🎉' : styles.goalIcon}
              </motion.span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${styles.gradient}`}
            initial={{ height: 0 }}
            animate={{ height: `${progress * 100}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
            {!isFinished ? (
              <div className="absolute inset-0 flex flex-col justify-between py-24 px-8">
                <div className="flex flex-col items-center">
                  <span className="text-8xl mb-4 sticker-effect">
                    {styles.goalIcon}
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] theme-text">Goal</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-5xl sticker-effect opacity-80">{styles.startIcon}</span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] mt-2 theme-text-muted">Start</span>
                </div>
              </div>
            ) : (
              <motion.span 
                className="text-9xl sticker-effect"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                🎉
              </motion.span>
            )}
          </div>
        </div>
      )}
      {totalTime > 0 && !isFinished && <MicroText timeLeft={timeLeft} totalTime={totalTime} />}
    </div>
  );
};
