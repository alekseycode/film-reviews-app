import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import "./index.css";
import { FilmsLayout } from "./layouts/FilmsLayout";
import ForgotPassAuthLayout from "./layouts/forgotPassAuthLayout";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import ResetPassLayout from "./layouts/ResetPassLayout";
import RootLayout from "./layouts/RootLayout";
import FilmDetails, { filmDetailsAndReviewsLoader } from "./pages/FilmDetails";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "films",
        element: <FilmsLayout />,
      },
      {
        path: "films/:id",
        element: <FilmDetails />,
        loader: filmDetailsAndReviewsLoader,
      },
      {
        path: "login",
        element: <LoginLayout />,
      },
      {
        path: "register",
        element: <RegisterLayout />,
      },
      {
        path: "forgotPass",
        element: <ForgotPassAuthLayout />,
      },
      {
        path: "resetPass",
        element: <ResetPassLayout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
