import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import App from './Container/App';
import { store } from './Storage';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 
   <Provider store={store}>
    <BrowserRouter>
    <ToastContainer/>
      <App/>
    </BrowserRouter>
   </Provider>

 
);


