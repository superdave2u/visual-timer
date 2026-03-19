/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';

interface HeaderProps {
  isRunning: boolean;
  accentColor: string;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isRunning, accentColor, onSettingsClick }) => {
  return (
    <AnimatePresence>
      {!isRunning && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10"
        >
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/40 shadow-xl">
            <h1 className={`text-xl font-black tracking-tight ${accentColor}`}>Visual Timer</h1>
          </div>
          <button
            onClick={onSettingsClick}
            className="p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-white/20 active:scale-90 transition-all"
          >
            <Settings className="w-6 h-6 text-slate-600" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
