
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from "./pages";


import Profile, {
  loader as profileLoader,
  action as profileAction,
} from "./pages/Profile";


import AddBook, { action as addBookAction } from "./pages/AddBook";
import AllBooks, { loader as allBooksLoader } from "./pages/AllBooks";
import EditBook, {
  loader as editBookLoader,
  action as editBookAction,
} from "./pages/EditBook";
import DeleteBook, {
  loader as deleteBookLoader,
  action as deleteBookAction,
} from "./pages/DeleteBook";


import Stats, { loader as statsLoader } from "./pages/Stats";

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
            path: "edit-book/:id",
            element: <EditBook />,
            loader: editBookLoader,
            action: editBookAction,
            errorElement: <Error />,
          },
         
          {
            path: "delete-book/:id",
            element: <DeleteBook />,
            loader: deleteBookLoader,
            action: deleteBookAction,
            errorElement: <Error />,
          },
         
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
            errorElement: <Error />,
          },
          
          {
            path: "profile",
            element: <Profile />,
            loader: profileLoader,
            action: profileAction,
            errorElement: <Error />,
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
