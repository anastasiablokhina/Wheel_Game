import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from  'react-router-dom'
import QuestionContent from '../components/QuestionContent';

const QuestionPage = () => {
  const { id: questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const history = useNavigate();

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

  return (
    <div className="page">
      {!question?.category && 
        <QuestionContent
          questionId={questionId}
          question={question}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  )
}

export default QuestionPage