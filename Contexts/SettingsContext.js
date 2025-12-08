// Contexts/SettingsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [variety, setVariety] = useState('gascon');

  // Charger variety depuis le store une seule fois
  useEffect(() => {
    const loadVariety = async () => {
      try {
        const storedVariety = await AsyncStorage.getItem('conjugations_variety');
        if (storedVariety !== null) {
          setVariety(storedVariety);
        }
      } catch (error) {
        console.log("Erreur de chargement variety :", error);
      }
    };

    loadVariety();
  }, []);

  const saveVariety = async (newVariety) => {
    try {
      await AsyncStorage.setItem('conjugations_variety', newVariety);
      await AsyncStorage.setItem('globalvar', newVariety);
      setVariety(newVariety);
    } catch (error) {
      console.log("Erreur de sauvegarde variety :", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ variety, saveVariety }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
