/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, Pause } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  totalTime: number;
  onToggle: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isRunning, totalTime, onToggle }) => {
  if (totalTime <= 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 z-20 flex justify-center">
      <button
        onClick={onToggle}
        className={`p-6 rounded-full shadow-2xl active:scale-90 transition-all border-4 border-white/50 backdrop-blur-sm ${
          isRunning ? 'bg-amber-500/90' : 'bg-emerald-500/90'
        } text-white`}
      >
        {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </button>
    </div>
  );
};
