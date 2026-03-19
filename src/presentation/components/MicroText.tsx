/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MicroTextProps {
  timeLeft: number;
  totalTime: number;
}

export const MicroText: React.FC<MicroTextProps> = ({ timeLeft, totalTime }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const linearProgress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  return (
    <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end z-10 pointer-events-none">
      <span className="text-[10px] font-black uppercase tracking-widest theme-text-muted">
        Progress {Math.round(linearProgress * 100)}%
      </span>
      <span className="text-[10px] font-black uppercase tracking-widest theme-text-muted">
        Remaining {formatTime(timeLeft)}
      </span>
    </div>
  );
};
