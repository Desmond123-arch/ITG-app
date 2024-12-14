import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "@/pages/Home.tsx";
import About from './pages/About';
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
