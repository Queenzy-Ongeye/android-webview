import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Initialize vConsole if in development mode
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole');
  new VConsole();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
