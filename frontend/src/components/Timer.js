import React, { useState, useEffect, useRef } from 'react'
import Toggle from './Toggle';
import startMusic from '../assets/music/start.mp3';
import middleMusic from '../assets/music/middle.mp3';
import endMusic from '../assets/music/end.mp3';

const Timer = ( { initialTime = 60, blitzIsFinished = false, setBlitzFinished = false }) => {
  const [isRunning, setRunning] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(initialTime);
  const audioRefStart = useRef(null);
  const audioRefMiddle = useRef(null);
  const audioRefEnd = useRef(null);

  const startTimer = () => {
    audioRefStart.current.play()
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

useEffect(() => {
  if (blitzIsFinished) {
    setBlitzFinished(false);
    setRunning(false);
    setFinished(false);
    setPaused(false);
    setSecondsRemaining(initialTime);
  }
}, [blitzIsFinished, setBlitzFinished, initialTime])

useEffect(() => {
  if (secondsRemaining === 10 && initialTime === 60) { 
    audioRefMiddle.current.play();
  } else if (secondsRemaining === 0) {
    audioRefEnd.current.play();
    setFinished(true);
  }
}, [secondsRemaining, initialTime]);

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
      <audio ref={audioRefStart}>
        <source src={startMusic} type="audio/mpeg" />
      </audio>
      <audio ref={audioRefMiddle}>
        <source src={middleMusic} type="audio/mpeg" />
      </audio>
      <audio ref={audioRefEnd}>
        <source src={endMusic} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default Timer