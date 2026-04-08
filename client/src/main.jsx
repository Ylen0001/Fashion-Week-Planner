import { StrictMode } from 'react' // Outil de debug dev
import { createRoot } from 'react-dom/client' // Permet de brancher React sur le DOM (la page html)
import './index.css' // Les styles css
import App from './App.jsx' // Le composant principal React
import { BrowserRouter } from "react-router-dom";


/* On branche React sur index.html, 
root correspond à l'endroit où le faire dedans. 
.render pour afficher 
Pour le reste : Affiche App avec StrictMode autour */

createRoot(document.getElementById('root')).render( // Branche React sur index.html 
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// En conclusion : Trouve #root dans index.html, crée un point d'entrée React, affiche App dedans.
// main.jsx est donc le pont entre React et l'html.

/* Analogie finale : 
- index.html : Le cadre vide (Le DOM) 
- main.jsx : la main qui accroche le tableau 
- App.jsx : Le tableau 
- BrowserRouter = système de couloir/portes entre les pièces */