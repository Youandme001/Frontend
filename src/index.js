// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Your main application component

ReactDOM.render(
  <Router> {/* Wrap your App component with BrowserRouter */}
    <App />
  </Router>,
  document.getElementById('root')
);

