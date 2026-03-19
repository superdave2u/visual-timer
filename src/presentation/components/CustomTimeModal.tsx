/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (seconds: number) => void;
}

export const CustomTimeModal: React.FC<CustomTimeModalProps> = ({ isOpen, onClose, onStart }) => {
  const [customMinutes, setCustomMinutes] = useState('5');

  const handleStart = () => {
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      onStart(mins * 60);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-[3rem] shadow-2xl z-[70] p-10 text-center"
          >
            <h2 className="text-3xl font-black mb-2">Custom Time</h2>
            <p className="text-slate-500 mb-8">How many minutes?</p>

            <div className="bg-slate-50 rounded-3xl p-6 mb-8 border-2 border-slate-100">
              <input
                type="number"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                className="w-full bg-transparent text-6xl font-black text-center outline-none text-slate-900"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-5 rounded-2xl font-bold bg-slate-100 text-slate-600 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleStart}
                className="flex-1 py-5 rounded-2xl font-bold bg-indigo-500 text-white shadow-lg shadow-indigo-200 active:scale-95 transition-all"
              >
                Start
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
