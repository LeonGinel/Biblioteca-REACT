/**
 * Archivo: main.tsx
 * -------------------
 * Punto de entrada que monta la aplicación React en el DOM usando ReactDOM.createRoot.
 * Aquí envolvemos la aplicación en <StrictMode> para detectar posibles problemas durante el desarrollo.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
