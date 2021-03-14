import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';
import { RootStateProvider } from './stores/RootStateContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <RootStateProvider>
      <App />
    </RootStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
