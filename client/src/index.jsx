import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './index.css';
import { FilmsLayout } from './layouts/FilmsLayout';
import RootLayout from './layouts/RootLayout';
import FilmDetails, { filmDetailsLoader } from './pages/FilmDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "films",
        element: <FilmsLayout />,
      },
      {
         path: 'films/:id',
         element: <FilmDetails />,
         loader: filmDetailsLoader       
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


