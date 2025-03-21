import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout';
import Error404Page from './pages/page404';
<<<<<<< HEAD
import routes, { landingPageRoutes } from './routes';
=======
import routes, { landingRoutes } from './routes';
>>>>>>> c4ff03493f04088bc7c0b5ca9939056851a8a3b0
import LandingPageLayout from './components/LandingPageLayout';


function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <Error404Page/>,
      children: routes
    },
    {
      element: <LandingPageLayout/>,
      errorElement: <Error404Page/>,
<<<<<<< HEAD
      children: landingPageRoutes
=======
      children: landingRoutes
>>>>>>> c4ff03493f04088bc7c0b5ca9939056851a8a3b0
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
