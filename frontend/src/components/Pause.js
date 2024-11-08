import React, { useState, useEffect, useRef } from 'react'
import pauseImage from '../assets/images/pause.png';
import playImage from '../assets/images/play.png';
import pauseMusic from '../assets/music/pause.mp3';

const Pause = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [image, setImage] = useState(playImage);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setImage(playImage);
    } else {
      audio.play();
      setImage(pauseImage);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="pause">
      <img
        src={image}
        alt=""
        onClick={handleClick}
      />
      <audio ref={audioRef} loop>
        <source src={pauseMusic} type="audio/mpeg"/>
      </audio>
    </div>
  )
}

export default Pause