import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children, initialSeenQuestionIDs = [] }) => {
  const [spinning, setSpinning] = useState(false);
  const [value, setValue] = useState(null);
  const [seenQuestionIDs, setSeenQuestionIDs] = useState(initialSeenQuestionIDs);
  
  return (
    <AppContext.Provider value={{ spinning, setSpinning, value, setValue, seenQuestionIDs, setSeenQuestionIDs }}>
      {children}
    </AppContext.Provider>
  );
};