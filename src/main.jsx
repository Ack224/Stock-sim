import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Market from './pages/market'
import Obserwacje from './pages/Obserwacje'
import Kontakt from './pages/Kontakt'
import LoginForm from './pages/LoginForm'
import NotFound from './pages/NotFound'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/market',
        element: <Market />
      },
      {
        path: '/obserwacje', // <--- TU JEST TWOJA GRA
        element: <Obserwacje />
      },
      {
        path: '/kontakt',
        element: <Kontakt />
      },
      {
        path: '/Login',
        element: <LoginForm />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>
)