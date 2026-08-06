import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ArcanoProvider } from './context/ArcanoContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ArcanoProvider>
      <App />
    </ArcanoProvider>
  </React.StrictMode>
);