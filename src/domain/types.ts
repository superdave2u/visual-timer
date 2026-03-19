/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeType = 'rainbow' | 'ocean' | 'forest' | 'sunset' | 'hourglass' | 'circle';

export interface TimerSettings {
  easingMode: boolean;
  theme: ThemeType;
  showTimePassed: boolean;
  showTimeRemaining: boolean;
}

export interface ThemeStyles {
  bg: string;
  bar: string;
  accent: string;
  fill: string;
  gradient: string;
  startIcon: string;
  goalIcon: string;
}
