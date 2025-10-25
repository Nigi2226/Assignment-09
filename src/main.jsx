import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router.jsx';
import './index.css'; 
import AuthProvider from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster /> {/* Toaster setup */}
    </AuthProvider>
  </React.StrictMode>,
);