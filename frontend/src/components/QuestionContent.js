import React, { useState } from 'react'

const QuestionContent = ( { questionId, question } ) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  if (!question || !question.content || question.content.length === 0) {
    return null;
  }

  const currentContent = question.content[currentIndex];

  const handleScreenClick = () => {
    if (!isContentVisible) {
      setIsContentVisible(true);
   }
   };

  return (
    <div className="content__wrapper" onClick={handleScreenClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className="content">
        <h1 className="content__title">Вопрос #{questionId}</h1>
        {isContentVisible && (
          <p className="content__text">{currentContent.body}</p>
        )}
      </div>
    </div>
  )
}

export default QuestionContent