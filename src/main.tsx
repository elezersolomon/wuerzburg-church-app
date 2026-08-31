import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import churchLogo from './assets/logo.png'

// Use the church logo as the browser-tab icon (favicon).
const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (faviconLink) {
  faviconLink.type = 'image/png'
  faviconLink.href = churchLogo
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
