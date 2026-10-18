import './styles/tokens.css';
import './styles/base.css';
import './styles/typography.css';
import './styles/textures.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { LangProvider } from './hooks/useLang';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);
