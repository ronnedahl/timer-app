import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import SetTimer from './sites/SetTimer.jsx'
import TimerAnalog from './sites/TimerAnalog.jsx'
import AlarmView from './sites/AlarmView.jsx'
import TimerDigital from './sites/TimerDigital.jsx'
import './index.css'

const router = createBrowserRouter([{
  path: '/loading',
  element: <App />,
},
{

  path: '/start',
  element: <SetTimer />
},

{
  path: '/digital',
  element: <TimerDigital />

},

{
  path: '/analog',
  element: <TimerAnalog />
},

{
  path: 'alarm',
  element: <AlarmView />
},
{
  path: '/',
element: <Navigate to="/loading" replace />
},
{
  path: '*',
  element: <div>404 Page Not Found</div>,
}


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
