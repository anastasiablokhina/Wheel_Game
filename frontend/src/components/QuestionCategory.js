import React from 'react'
import blackboxIcon from '../assets/images/blackbox.png';
import handoutIcon from '../assets/images/handout.png';
import blitzIcon from '../assets/images/blitz.png';
import superblitzIcon from '../assets/images/superblitz.png';

const QuestionCategory = ( { category }) => {
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

  return (
    <div className="category">
      <h2 className="category__title">{transcription[category]}</h2>
      <img className="category__image" src={image[category]} id={category} alt="" />
    </div>
  )
}

export default QuestionCategory