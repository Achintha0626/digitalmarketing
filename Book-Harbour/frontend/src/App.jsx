import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Profile,
  Stats,
} from "./pages";

import AddBook, { action as addBookAction } from "./pages/AddBook";

import AllBooks, { loader as allBooksLoader } from "./pages/AllBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddBook />,
            action: addBookAction,
            errorElement: <Error />,
          },
          {
            path: "all-books",
            element: <AllBooks />,
            loader: allBooksLoader,
            errorElement: <Error />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  useEffect(() => {
    const isDark = localStorage.getItem("darkTheme") === "true";
    document.body.classList.toggle("dark-theme", isDark);
  }, []);

  return <RouterProvider router={router} />;
}
