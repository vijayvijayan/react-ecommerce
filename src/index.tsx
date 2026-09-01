import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import App from './Container/App';
import { store, persistor } from './Storage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);