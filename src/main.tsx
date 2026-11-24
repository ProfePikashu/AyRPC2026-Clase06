import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './components/glossary.css';
import { GlossaryProvider } from './components/Glossary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><GlossaryProvider><App /></GlossaryProvider></React.StrictMode>,
);
