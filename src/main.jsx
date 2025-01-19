import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/input.css'
import App from './App.jsx'

import { FilterContextProvider } from './Components/DataGrid/DataGridFilterContext/DataGridsFilterContext'
import { CheckedContextProvider } from './Components/DataGrid/DataGridFilterContext/CheckedContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterContextProvider>
      <CheckedContextProvider>
        <App />
      </CheckedContextProvider>
    </FilterContextProvider>
  </StrictMode>
  ,)
