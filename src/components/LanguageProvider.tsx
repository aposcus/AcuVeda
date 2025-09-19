import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set HTML direction based on language
    const isRTL = ['ar', 'he', 'fa'].includes(i18n.language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add RTL classes to body if needed
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);

  return <>{children}</>;
};

export default LanguageProvider;