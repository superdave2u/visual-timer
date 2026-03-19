/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';
import { PRESETS } from '../../domain/constants';

interface PresetsProps {
  isRunning: boolean;
  totalTime: number;
  timeLeft: number;
  accentColor: string;
  onStart: (seconds: number) => void;
  onCustomClick: () => void;
}

export const Presets: React.FC<PresetsProps> = ({
  isRunning,
  totalTime,
  timeLeft,
  accentColor,
  onStart,
  onCustomClick,
}) => {
  return (
    <AnimatePresence>
      {!isRunning && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full px-6"
        >
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-3 shadow-2xl border border-white/40 flex gap-2">
            {PRESETS.map((m) => (
              <button
                key={m}
                onClick={() => onStart(m * 60)}
                className={`flex-1 py-5 rounded-[1.8rem] font-black text-lg transition-all active:scale-95 ${
                  totalTime === m * 60 && timeLeft > 0
                    ? `bg-slate-800 text-white shadow-xl`
                    : `bg-white/50 ${accentColor} hover:bg-white`
                }`}
              >
                {m}m
              </button>
            ))}
            <button
              onClick={onCustomClick}
              className="w-20 flex items-center justify-center bg-indigo-500 text-white rounded-[1.8rem] active:scale-95 transition-all shadow-lg"
            >
              <Clock className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
