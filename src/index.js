import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './Components/App';
import { DataLayer } from './Context/DataLayer';
import { initialState, reducer } from './Context/reducer';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <Router>
        <App/>
      </Router>
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);