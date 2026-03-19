/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeType, ThemeStyles } from '../../domain/types';

export const getThemeStyles = (theme: ThemeType): ThemeStyles => {
  switch (theme) {
    case 'ocean':
      return {
        bg: 'bg-blue-50',
        bar: 'bg-blue-400',
        accent: 'text-blue-600',
        fill: '#60a5fa',
        gradient: 'from-blue-400 to-cyan-400',
        startIcon: '💧',
        goalIcon: '🐳'
      };
    case 'forest':
      return {
        bg: 'bg-emerald-50',
        bar: 'bg-emerald-400',
        accent: 'text-emerald-600',
        fill: '#34d399',
        gradient: 'from-emerald-400 to-green-400',
        startIcon: '🌱',
        goalIcon: '🌳'
      };
    case 'sunset':
      return {
        bg: 'bg-orange-50',
        bar: 'bg-orange-400',
        accent: 'text-orange-600',
        fill: '#fb923c',
        gradient: 'from-orange-400 to-pink-500',
        startIcon: '🌅',
        goalIcon: '🌙'
      };
    case 'hourglass':
      return {
        bg: 'bg-slate-50',
        bar: 'bg-amber-400',
        accent: 'text-amber-600',
        fill: '#fbbf24',
        gradient: 'from-amber-400 to-yellow-600',
        startIcon: '⏳',
        goalIcon: '⌛'
      };
    case 'circle':
      return {
        bg: 'bg-slate-50',
        bar: 'bg-rose-400',
        accent: 'text-rose-600',
        fill: '#fb7185',
        gradient: 'from-rose-400 to-red-500',
        startIcon: '⭕',
        goalIcon: '🎯'
      };
    case 'rainbow':
    default:
      return {
        bg: 'bg-slate-50',
        bar: 'bg-indigo-400',
        accent: 'text-indigo-600',
        fill: '#6366f1',
        gradient: 'from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400',
        startIcon: '🌈',
        goalIcon: '🦄'
      };
  }
};
