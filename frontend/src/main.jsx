import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor,store } from './Redux/Store'
import { PersistGate } from 'redux-persist/es/integration/react'
import ErrorBoundary from './Pages/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
     <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
     <App />
   </BrowserRouter>
    </PersistGate>
  </Provider>
  </ErrorBoundary>
)
