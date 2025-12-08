// Contexts/SoundContext.js
import React, { createContext, useState, useContext } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isLoadingSound, setIsLoadingSound] = useState(false);

  return (
    <SoundContext.Provider value={{ isLoadingSound, setIsLoadingSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
