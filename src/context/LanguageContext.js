import React, { createContext, useState, useEffect } from 'react';
import { getStoredLanguage, changeLanguage } from '../i18n/i18n';


export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await getStoredLanguage();
      if (storedLang) setLanguage(storedLang);
    };
    loadLanguage();
  }, []);

  const switchLanguage = async (lang) => {
    await changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
