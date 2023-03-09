import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css';
import { FilmsLayout } from './layouts/FilmsLayout';
import LoginLayout, {loginAction} from './layouts/LoginLayout';
import RootLayout from './layouts/RootLayout';
import FilmDetails, {filmDetailsAndReviewsLoader} from './pages/FilmDetails';
import { Home } from './pages/Home';
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: "films",
        element: <FilmsLayout />,
      },
      {
        path: 'films/:id',
        element: <FilmDetails />,
        loader: filmDetailsAndReviewsLoader    
      },
      {
        path: 'login',
        element: <LoginLayout />,
        action: loginAction
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider> 
  </React.StrictMode>
);


