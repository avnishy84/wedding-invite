import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { weddingData } from '../content/wedding';

type Lang = 'en' | 'hi';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

interface LangProviderProps {
  children: ReactNode;
}

export function LangProvider({ children }: LangProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('wedding-lang');
    return stored === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('wedding-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
  };

  const t = (key: string): string => {
    const value = weddingData.strings[lang][key];
    if (value === undefined) {
      if (import.meta.env.DEV) {
        throw new Error(`[useLang] Missing string key: "${key}" for lang "${lang}"`);
      }
      return key;
    }
    return value;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return ctx;
}
