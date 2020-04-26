import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import axios from 'axios'

axios.get('http://localhost:3001/persons').then(response => {
  const persons = response.data
  console.log(persons)
})



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

