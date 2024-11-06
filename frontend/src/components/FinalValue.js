import React, { useContext }  from 'react'
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';

const FinalValue = () => {
  const { value, spinning } = useContext(AppContext)
  return (
    <div className="final-value">
      {spinning ? (
        <p>КО-ЛЕ-СО</p>
      ) : value !== null ? (
        <Link className="final-value__link">Вопрос {value}</Link>
      ) : (
        <p>Крути колесо блин</p>
      )}
    </div>
  )
}

export default FinalValue