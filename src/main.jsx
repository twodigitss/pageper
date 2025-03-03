import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import App from './App.jsx'
import user_pref from '@template'

//save defaults
const default_data = JSON.stringify(user_pref);
localStorage.setItem("pageper_defaults", default_data);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
