import React, { useContext }  from 'react'
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';

const FinalValue = () => {
  const { value, spinning, seenQuestionIDs } = useContext(AppContext)
  return (
    <div className="final-value">
      {spinning ? (
        <p>Раунд {seenQuestionIDs.length + 1}</p>
      ) : value !== null ? (
        <Link className="final-value__link" to={`/${value}`}>Вопрос {value}</Link>
      ) : (
        <p>Крути колесо блин</p>
      )}
    </div>
  )
}

export default FinalValue