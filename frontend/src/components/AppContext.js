import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [spinning, setSpinning] = useState(false);
  
  return (
    <AppContext.Provider value={{ spinning, setSpinning }}>
      {children}
    </AppContext.Provider>
  );
};