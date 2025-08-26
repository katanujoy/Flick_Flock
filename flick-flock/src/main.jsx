import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from "./contexts/globalendpoints";
import { AuthProvider } from "./contexts/authcontext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider>
       <AuthProvider>
          <App />
       </AuthProvider>
    </ApiProvider>
  </StrictMode>,
)