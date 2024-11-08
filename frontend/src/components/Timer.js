import React, { useState, useEffect } from 'react'
import Toggle from './Toggle';

const Timer = ( { initialTime = 60 }) => {
  const [isRunning, setRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);

  const startTimer = () => {
    setRunning(true);
    setFinished(false);
  };

  const resetTimer = () => {
    setSecondsRemaining(initialTime);
    startTimer();
  };

  const toggle = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1; 
          } else {
            setFinished(true);
            setRunning(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
}, [isRunning, isPaused]);

  return (
    <div className="timer">
      {!isRunning ? (
        <button className={`timer__btn ${isFinished ? 'timer__btn--finished' : ''}`} onClick={isFinished ? resetTimer : startTimer}>
          {isFinished ? 'Доп.время' : 'время'}
        </button>
        ) : (
        <div className="timer__container">
          <p className="timer__value">{secondsRemaining}</p>
          <Toggle isPaused={isPaused} onClick={toggle}/>
        </div>
        )
      }
    </div>
  )
}

export default Timer