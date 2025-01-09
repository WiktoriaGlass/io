import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import TripResult from './trip-result/TripResult';  // Importowanie TripResult (służy do wyświetlania wyników podróży)

//nawigacja programu, z wykorzystaniem tego możemy pomyślnie poruszać się po programie 
const router=createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/trip-result',
    element:<TripResult/>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
