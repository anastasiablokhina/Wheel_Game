import React, { useState, useEffect } from 'react'
import PieChart from '../components/PieChart';
import { AppProvider } from '../components/AppContext';

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
      <AppProvider> 
        <h1 className="title">Что? Где? Когда?</h1>
        <PieChart nums={questionIDs} />
      </AppProvider>
    </div>
  ) 
}

export default WheelPage