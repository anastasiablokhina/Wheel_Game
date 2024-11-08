import React, { useState } from 'react'
import { ReactComponent as Cross } from '../assets/icons/cross.svg'
import Timer from '../components/Timer';

const QuestionContent = ( { questionId, question, handleSubmit } ) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [blitzIsFinished, setBlitzFinished] = useState(false);
  const blitzCategories = ['blitz', 'superblitz'];

  if (!question || !question.content || question.content.length === 0) {
    return null;
  }

  const currentContent = question.content[currentIndex];
  const hasNextItem = currentIndex < question.content.length - 1;

  const handleScreenClick = () => {
    if (!isContentVisible) {
      setIsContentVisible(true);
   }
  };

  const handleNextClick = () => {
    if (currentIndex < question.content.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setBlitzFinished(true);
      setIsContentVisible(false);
    }
  };

  return (
    <div className="content__wrapper" onClick={handleScreenClick}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <div className="content">
        <Cross style={{ position: 'absolute', alignSelf: 'end' }} onClick={handleSubmit} />
        <h1 className="content__title">Вопрос #{questionId}</h1>
        {isContentVisible && (
          <p className="content__text">{currentContent.body}</p>
        )}
      </div>
      <div className="bottom">
        <Timer blitzIsFinished={blitzIsFinished}
               setBlitzFinished={setBlitzFinished}
               initialTime={blitzCategories.includes(question.category) ? 30 : 60}/>
        {hasNextItem && 
          <button className="next" onClick={handleNextClick}>След.вопрос</button>
        }
      </div>
    </div>
  )
}

export default QuestionContent