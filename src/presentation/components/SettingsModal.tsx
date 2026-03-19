/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Zap, ZapOff, Info } from 'lucide-react';
import { TimerSettings, ThemeType } from '../../domain/types';

interface SettingsModalProps {
  isOpen: boolean;
  settings: TimerSettings;
  accentColor: string;
  onClose: () => void;
  onUpdate: (settings: Partial<TimerSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  accentColor,
  onClose,
  onUpdate,
}) => {
  const [showEasingInfo, setShowEasingInfo] = useState(false);
  const themes: ThemeType[] = ['rainbow', 'ocean', 'forest', 'sunset', 'hourglass', 'circle'];

  // Extract color from accentColor class (e.g., 'text-indigo-600' -> 'indigo')
  const colorName = accentColor.split('-')[1];
  const activeBg = `bg-${colorName}-500`;
  const activeBorder = `border-${colorName}-500`;
  const activeText = `text-${colorName}-700`;
  const activeLightBg = `bg-${colorName}-50`;
  const activeLightText = `text-${colorName}-600`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] shadow-2xl z-50 p-10 pb-12"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black">Settings</h2>
              <button onClick={onClose} className="p-2 text-slate-400">✕</button>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${settings.easingMode ? `${activeLightBg} ${activeLightText}` : 'bg-slate-100 text-slate-400'}`}>
                      {settings.easingMode ? <Zap className="w-6 h-6" /> : <ZapOff className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-black text-lg">Easing Mode</p>
                        <button
                          onClick={() => setShowEasingInfo(!showEasingInfo)}
                          className={`p-1 text-slate-400 hover:${activeLightText} transition-colors`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Fast start, slow finish</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdate({ easingMode: !settings.easingMode })}
                    className={`w-16 h-10 rounded-full transition-colors relative ${settings.easingMode ? activeBg : 'bg-slate-200'}`}
                  >
                    <motion.div
                      className="absolute top-1.5 left-1.5 w-7 h-7 bg-white rounded-full shadow-md"
                      animate={{ x: settings.easingMode ? 24 : 0 }}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {showEasingInfo && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 space-y-2 border border-slate-100`}>
                        <p><strong className={activeLightText}>Easing Mode (On):</strong> Moves quickly at first to grab attention, then slows down at the end. Great for kids who need a "gentle" warning that time is almost up!</p>
                        <p><strong className="text-slate-900">Linear Mode (Off):</strong> Moves at a steady, constant speed from start to finish.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${settings.showTimePassed ? `${activeLightBg} ${activeLightText}` : 'bg-slate-100 text-slate-400'}`}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-lg">Show Time Passed</p>
                      <p className="text-sm text-slate-500 font-medium">Display elapsed time</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdate({ showTimePassed: !settings.showTimePassed })}
                    className={`w-16 h-10 rounded-full transition-colors relative ${settings.showTimePassed ? activeBg : 'bg-slate-200'}`}
                  >
                    <motion.div
                      className="absolute top-1.5 left-1.5 w-7 h-7 bg-white rounded-full shadow-md"
                      animate={{ x: settings.showTimePassed ? 24 : 0 }}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${settings.showTimeRemaining ? `${activeLightBg} ${activeLightText}` : 'bg-slate-100 text-slate-400'}`}>
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black text-lg">Show Time Remaining</p>
                      <p className="text-sm text-slate-500 font-medium">Display countdown</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdate({ showTimeRemaining: !settings.showTimeRemaining })}
                    className={`w-16 h-10 rounded-full transition-colors relative ${settings.showTimeRemaining ? activeBg : 'bg-slate-200'}`}
                  >
                    <motion.div
                      className="absolute top-1.5 left-1.5 w-7 h-7 bg-white rounded-full shadow-md"
                      animate={{ x: settings.showTimeRemaining ? 24 : 0 }}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-slate-100 text-slate-600">
                    <Palette className="w-6 h-6" />
                  </div>
                  <p className="font-black text-lg">Theme</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => onUpdate({ theme: t })}
                      className={`py-4 rounded-2xl font-bold capitalize border-2 transition-all ${
                        settings.theme === t ? `${activeBorder} ${activeLightBg} ${activeText}` : 'border-slate-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
