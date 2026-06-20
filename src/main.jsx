import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProjectContextProvider } from './contexts/ProjectContext.jsx'
import { LibraryContextProvider } from './contexts/LibraryContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProjectContextProvider>
      <LibraryContextProvider>
    <App />
    </LibraryContextProvider>
    </ProjectContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
