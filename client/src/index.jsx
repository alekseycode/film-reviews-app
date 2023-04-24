import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import "./index.css";
import { FilmsLayout } from "./layouts/FilmsLayout";
import ForgotPassAuthLayout from "./layouts/ForgotPassAuthLayout";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import ResetPassLayout from "./layouts/ResetPassLayout";
import RootLayout from "./layouts/RootLayout";
import FilmDetails from "./pages/FilmDetails";
import { Home } from "./pages/Home";

if (process.env.NODE_ENV === "local" && window.location.protocol !== "https:") {
  window.location.href =
    "https://" + window.location.host + window.location.pathname;
}

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
