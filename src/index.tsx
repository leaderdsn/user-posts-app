import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './components/app';
import { RootStateProvider } from './stores/RootStateContext';

ReactDOM.render(
  <React.StrictMode>
    <RootStateProvider>
      <App />
    </RootStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
