import React, { useRef, useEffect } from 'react'
import blackboxIcon from '../assets/images/blackbox.png';
import handoutIcon from '../assets/images/handout.png';
import blitzIcon from '../assets/images/blitz.png';
import superblitzIcon from '../assets/images/superblitz.png';
import clapMusic from '../assets/music/clap.mp3';

const QuestionCategory = ( { category, onShowContent }) => {
  const transcription = {
    "blackbox" : "Чёрный ящик",
    "handout" : "Вопрос с раздаткой",
    "blitz" : "Блиц",
    "superblitz" : "Суперблиц",
  }

  const image = {
    "blackbox" : blackboxIcon,
    "handout" : handoutIcon,
    "blitz": blitzIcon,
    "superblitz" : superblitzIcon,
  }

  const audioRef = useRef(null);

  useEffect(() => {
    if (category === "blackbox" || category === "handout") {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [category]);

  return (
    <div className="category">
      <h2 className="category__title">{transcription[category]}</h2>
      <img className="category__image" src={image[category]} id={category} alt="" />
      <button className="category__next" onClick={onShowContent}>Перейти к вопросу</button>
      <audio ref={audioRef} loop>
        <source src={clapMusic} type="audio/mpeg"/>
      </audio>
    </div>
  )
}

export default QuestionCategory