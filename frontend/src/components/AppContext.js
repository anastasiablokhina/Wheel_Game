import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [spinning, setSpinning] = useState(false);
  const [value, setValue] = useState(null);
  
  return (
    <AppContext.Provider value={{ spinning, setSpinning, value, setValue }}>
      {children}
    </AppContext.Provider>
  );
};