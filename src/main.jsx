import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import Router from './router/Router';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthProvider from './provider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
