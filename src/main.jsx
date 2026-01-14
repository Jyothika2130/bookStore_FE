import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Authprovider } from './Context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="721596423924-03d7qr5qo6p3utr5k8bt3uhpun7hqvmr.apps.googleusercontent.com">
    <BrowserRouter>
<Authprovider>
  <App />    
</Authprovider>
      
    
    
    </BrowserRouter>
    </GoogleOAuthProvider>
    
  </StrictMode>
)
