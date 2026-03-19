/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTimer } from './application/hooks/useTimer';
import { useSettings } from './application/hooks/useSettings';
import { getThemeStyles } from './presentation/theme/styles';
import { TimerDisplay } from './presentation/components/TimerDisplay';
import { Header } from './presentation/components/Header';
import { Controls } from './presentation/components/Controls';
import { Presets } from './presentation/components/Presets';
import { CustomTimeModal } from './presentation/components/CustomTimeModal';
import { SettingsModal } from './presentation/components/SettingsModal';

export default function App() {
  const { settings, showSettings, updateSettings, toggleSettings } = useSettings();
  const {
    timeLeft,
    totalTime,
    isRunning,
    isFinished,
    progress,
    startTimer,
    toggleTimer,
    resetTimer,
  } = useTimer(settings.easingMode);

  const [showCustomModal, setShowCustomModal] = useState(false);
  const themeStyles = getThemeStyles(settings.theme);

  return (
    <div
      className={`fixed inset-0 ${themeStyles.bg} transition-colors duration-500 font-sans overflow-hidden select-none ${isFinished ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (isFinished) {
          resetTimer();
        }
      }}
    >
      <TimerDisplay
        theme={settings.theme}
        styles={themeStyles}
        progress={progress}
        timeLeft={timeLeft}
        totalTime={totalTime}
        isRunning={isRunning}
        isFinished={isFinished}
        showTimePassed={settings.showTimePassed}
        showTimeRemaining={settings.showTimeRemaining}
      />

      {!isFinished && (
        <>
          <Header
            isRunning={isRunning}
            accentColor={themeStyles.accent}
            onSettingsClick={toggleSettings}
          />

          <Controls
            isRunning={isRunning}
            totalTime={totalTime}
            onToggle={toggleTimer}
          />

          <Presets
            isRunning={isRunning}
            totalTime={totalTime}
            timeLeft={timeLeft}
            accentColor={themeStyles.accent}
            onStart={startTimer}
            onCustomClick={() => setShowCustomModal(true)}
          />
        </>
      )}

      <CustomTimeModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onStart={startTimer}
      />

      <SettingsModal
        isOpen={showSettings}
        settings={settings}
        accentColor={themeStyles.accent}
        onClose={toggleSettings}
        onUpdate={updateSettings}
      />
    </div>
  );
}
