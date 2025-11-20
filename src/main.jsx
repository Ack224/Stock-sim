import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Navigation from './components/Navigation'
import Blog from './pages/Blog'
import Layout from './components/Layout'
import BlogPost from './pages/BlogPost'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminSettings from './pages/AdminSettings'
import Adminav from './pages/Adminnav'
import LoginForm from './pages/LoginForm'
import Gry from './pages/Gry'
import Gras from './pages/Gras'
const router = createBrowserRouter([
    
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />

      },

      {
        path: '/o-nas',
        element: <About />
      },
      {
        path: '/kontakt',
        element: <Contact />
      },
      {
        path: '/Blog',
        element: <Blog />


      },
       {
        path: '/Gry',
        element: <Gry />


      },
      {
        path: '/Login',
        element: <LoginForm />
      },
      {
        path: '/NotFound',

        element:
          <>

            <Navigation />
          </>

      },
      {
        path: '/Blog/:postId',
        element: <BlogPost />


      },
      {
        path: '/Gry/:graid',
        element: <Gras />


      },
      {
        path: '/Admin',
        element: <Adminav />,
        children: [
          {
            path: '/Admin/users',
            element: <AdminUsers />
          },
          {
            path: '/Admin/settings',
            element: <AdminSettings />
          },
        ]
      },
    ]


  },

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
