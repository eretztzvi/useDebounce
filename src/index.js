import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './contexts/colorContext';
import { SearchWordsProvider } from './contexts/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <SearchWordsProvider>
        <App />
      </SearchWordsProvider>
    </ThemeProvider>
  </React.StrictMode>
);

