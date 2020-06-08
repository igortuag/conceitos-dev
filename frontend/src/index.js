import React from 'react';
import ReactDom from 'react-dom'
import { render } from 'react-dom';

import App from './App';
import Header from './components/Header'

render(
  <>
    <Header />
    <Header />
    <Header />
    <Header />
  </>
  ,document.getElementById('app')
  );