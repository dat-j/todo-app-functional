import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './components/ThemeProvider';
import { Provider } from 'react-redux';
import { todoReducer } from './components/function/todoReducer';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider>
      <App />
    </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
