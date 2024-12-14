import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout';
import Error404Page from './pages/page404';
import routes from './routes';


function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <Error404Page/>,
      children: routes
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
