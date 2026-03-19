/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { TimerSettings, ThemeType } from '../../domain/types';

export const useSettings = () => {
  const [settings, setSettings] = useState<TimerSettings>({
    easingMode: true,
    theme: 'rainbow',
    showTimePassed: false,
    showTimeRemaining: false,
  });
  const [showSettings, setShowSettings] = useState(false);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  return {
    settings,
    showSettings,
    updateSettings,
    toggleSettings,
  };
};
