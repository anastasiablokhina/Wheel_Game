import React, { useRef, useEffect, useMemo } from 'react'
import { HotKeys } from 'react-hotkeys';
import boomMusic from '../assets/music/boom.mp3';
import winMusic from '../assets/music/win.mp3';
import loseMusic from '../assets/music/lose.mp3';

const AudioPlayer = () => {
  const audioRef = useRef(null);

  const keyMap = {
    PLAY_BOOM_MUSIC: 'KeyQ',
    PLAY_WIN_MUSIC: 'KeyW',
    PLAY_LOSE_MUSIC: 'KeyL',
    STOP_MUSIC: 'KeyS',
  };

  const handlers = useMemo(() => ({
    STOP_MUSIC: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    PLAY_BOOM_MUSIC: () => {
      if (audioRef.current) {
        audioRef.current.src = boomMusic;
        audioRef.current.play();
        audioRef.current.loop = false;
      }
    },
    PLAY_WIN_MUSIC: () => {
      if (audioRef.current) {
        audioRef.current.src = winMusic;
        audioRef.current.play();
        audioRef.current.loop = true;
      }
    },
    PLAY_LOSE_MUSIC: () => {
      if (audioRef.current) {
        audioRef.current.src = loseMusic;
        audioRef.current.play();
        audioRef.current.loop = true;
      }
    },
  }), [audioRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyW') {
        handlers.PLAY_WIN_MUSIC();
      } else if (event.code === 'KeyL') {
        handlers.PLAY_LOSE_MUSIC(); 
      } else if (event.code === 'KeyS') {
        handlers.STOP_MUSIC();
      } else if (event.code === 'KeyQ') {
        handlers.PLAY_BOOM_MUSIC();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlers]); 

  return (
    <div>
      <HotKeys keyMap={keyMap} handlers={handlers} />
      <audio ref={audioRef} />
    </div>
  )
}

export default AudioPlayer