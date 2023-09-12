import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId='302009379903-lvfvam4poqchau007anb4eqh2oshuoig.apps.googleusercontent.com'   >

    <App />

  </GoogleOAuthProvider>
  </React.StrictMode>

)
