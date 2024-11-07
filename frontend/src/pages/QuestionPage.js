import React, { useState, useEffect } from 'react'
import { useParams } from  'react-router-dom'
import QuestionContent from '../components/QuestionContent';

const QuestionPage = () => {
  const { id: questionId } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      let response = await fetch(`/api/questions/${questionId}/`)
      let data = await response.json()
      setQuestion(data)
    }
    getQuestion()
  }, [questionId])

  return (
    <div className="page">
      {!question?.category && 
        <QuestionContent
          questionId={questionId}
          question={question}
        />
      }
    </div>
  )
}

export default QuestionPage