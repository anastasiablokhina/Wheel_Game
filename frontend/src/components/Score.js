import React, { useState, useEffect } from 'react'
import viewersImage from '../assets/images/viewers.png'
import expertsImage from '../assets/images/experts.png'

const Score = () => {
  const [expertsScore, setExpertsScore] = useState(() => {
    const storedExpertsScore = localStorage.getItem('expertsScore');
    return storedExpertsScore ? parseInt(storedExpertsScore) : 0;
  });

  const [viewersScore, setViewersScore] = useState(() => {
    const storedViewersScore = localStorage.getItem('viewersScore');
    return storedViewersScore ? parseInt(storedViewersScore) : 0;
  });

  useEffect(() => {
    localStorage.setItem('expertsScore', expertsScore);
    localStorage.setItem('viewersScore', viewersScore);
  }, [expertsScore, viewersScore]);

  const handleExpertsScoreChange = (e) => {
    setExpertsScore(e.target.value);
  };

  const handleViewersScoreChange = (e) => {
    setViewersScore(e.target.value);
  };

  return (
    <div className="score">
      <div className="score__field"> 
        <img
          className="field__icon"
          src={viewersImage}
          alt="viewers"
        />
        <input
          type="text" 
          className="field__input"
          value={viewersScore}
          onChange={handleViewersScoreChange} 
        />
      </div>
      <span>:</span>
      <div className="score__field"> 
        <img
          className="field__icon"
          src={expertsImage}
          alt="experts"
        />
        <input
          type="text" 
          className="field__input"
          value={expertsScore}
          onChange={handleExpertsScoreChange} 
        />
      </div>
    </div>
  )
}

export default Score