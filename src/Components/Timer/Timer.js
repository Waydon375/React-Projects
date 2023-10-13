import React, { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Timer.css';
import PlayButton from './PlayButton/PlayButton';
import PauseButton from './PauseButton/PauseButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import SettingsContext from '../Settings/SettingContext';

const green = 'rgb(0, 255, 0)';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(false);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function switchMode() {
    const nextMode = modeRef.current === 'work' ?  'work' : 'break';
    const nextSeconds = nextMode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function initTimer() {
    setSecondsLeft(mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60);
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        switchMode();
        return;
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
  const percentage = ( secondsLeft / totalSeconds) * 100;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' +seconds;

  return (
    <div className="timer-container">
      <h1 className="header">EC Timer</h1>
      <div className="circular-progress">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            strokeLinecap: 'round',
            textColor: '#fff',
            textSize: '20px',
            pathColor: green,
            trailColor: 'rgba(255, 255, 255, .2)',
          })}
        />
      </div>
      <div className="button-container">
        {isPaused
         ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false}} /> 
        : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true}}/>}
      </div>
      <div className="settings-button">
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
