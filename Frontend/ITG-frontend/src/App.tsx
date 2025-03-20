import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout';
import Error404Page from './pages/page404';
import routes, { landingRoutes } from './routes';
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
      children: landingRoutes
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
