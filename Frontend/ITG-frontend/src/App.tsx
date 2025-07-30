import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Error404Page from './pages/page404';
import routes, { landingPageRoutes } from './routes';
import LandingPageLayout from './components/LandingPageLayout';
import { Toaster } from 'sonner';

function App() {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      errorElement: <Error404Page />,
      children: routes,
    },
    {
      element: <LandingPageLayout />,
      errorElement: <Error404Page />,
      children: landingPageRoutes,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
