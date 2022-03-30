import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
