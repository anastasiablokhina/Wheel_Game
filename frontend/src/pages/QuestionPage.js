import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from  'react-router-dom'
import QuestionContent from '../components/QuestionContent';
import QuestionCategory from '../components/QuestionCategory';

const QuestionPage = () => {
  const { id: questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const history = useNavigate();
  const [showContent, setShowContent] = useState(false);

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
      {question?.category && !showContent &&
        <QuestionCategory category={question.category} onShowContent={handleShowContent} />
      }
      {(!question?.category || showContent) && (
        <QuestionContent
          questionId={questionId}
          question={question}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default QuestionPage