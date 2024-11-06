import React, { useState, useEffect } from 'react'
import PieChart from '../components/PieChart';

const WheelPage = () => {
  const [questionIDs, setQuestionIDs] = useState([]);

  useEffect(() => {
    const fetchQuestionIDs = async () => {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestionIDs(data);
    };
    fetchQuestionIDs();
  }, []);

  return (
    <div className="wheel">
      <h1 className="title">Что? Где? Когда?</h1>
      <PieChart nums={questionIDs} />
    </div>
  ) 
}

export default WheelPage