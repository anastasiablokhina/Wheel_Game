import React, { createContext, useState, useEffect } from 'react'

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  useEffect(() => {
    const storedTeam1Score = localStorage.getItem('team1Score');
    const storedTeam2Score = localStorage.getItem('team2Score');
    if (storedTeam1Score !== null) {
      setTeam1Score(parseInt(storedTeam1Score)); 
    }
    if (storedTeam2Score !== null) {
      setTeam2Score(parseInt(storedTeam2Score));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('team1Score', team1Score.toString());
    localStorage.setItem('team2Score', team2Score.toString());
  }, [team1Score, team2Score]);

  return (
    <ScoreContext.Provider
      value={{
        team1Score,
        setTeam1Score,
        team2Score,
        setTeam2Score,
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}