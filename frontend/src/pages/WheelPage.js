import React, { useState, useEffect } from 'react'
import PieChart from '../components/PieChart';
import { AppProvider } from '../components/AppContext';
import FinalValue from '../components/FinalValue';
import Pause from '../components/Pause';
import Score from '../components/Score'

const WheelPage = () => {
  const [questionIDs, setQuestionIDs] = useState([]);
  const [seenQuestionIDs, setSeenQuestionIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionIDs = async () => {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestionIDs(data);
    };
    fetchQuestionIDs();
  }, []);

  useEffect(() => {
    const fetchSeenQuestionIDs = async () => {
      const response = await fetch('/api/questions/seen');
      const data = await response.json();
      setSeenQuestionIDs(data);
      setIsLoading(false);
    };
    fetchSeenQuestionIDs();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="wheel">
      <Score />
      <Pause />
      {questionIDs.length > 0 ? (
        <AppProvider initialSeenQuestionIDs={seenQuestionIDs}> 
          <h1 className="title">Что? Где? Когда?</h1>
          <PieChart nums={questionIDs} />
          <FinalValue />
        </AppProvider>
      ) : (
        <h1 className="title">Конец</h1>
      )}
      </div>
  ) 
}

export default WheelPage