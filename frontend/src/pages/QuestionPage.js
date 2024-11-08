import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from  'react-router-dom'
import QuestionContent from '../components/QuestionContent';
import QuestionCategory from '../components/QuestionCategory';
import AudioPlayer from '../components/AudioPlayer';

const QuestionPage = () => {
  const { id: questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const history = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const excludedCategories = ['warm-up', 'bonus', 'extra'];

  useEffect(() => {
    const getQuestion = async () => {
      let response = await fetch(`/api/questions/${questionId}/`)
      let data = await response.json()
      setQuestion(data)
    }
    getQuestion()
  }, [questionId])

  const updateQuestion = async (updatedField) => {
    fetch(`/api/questions/${questionId}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedField)
    })
  }

  const handleSubmit = () => {
    updateQuestion({ seen: true });
    history('/')
  }

  const handleShowContent = () => {
    setShowContent(true);
  };

  return (
    <div className="page">
      {question?.category && !showContent && !excludedCategories.includes(question.category) &&
        <QuestionCategory category={question.category} onShowContent={handleShowContent} />
      }
      {(!question?.category || showContent || excludedCategories.includes(question.category)) && (
        <QuestionContent
          questionId={questionId}
          question={question}
          handleSubmit={handleSubmit}
        />
      )}
      <AudioPlayer/>
    </div>
  )
}

export default QuestionPage