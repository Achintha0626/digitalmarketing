import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AllBooks,
  Profile,
  AddBook,
  Stats,
} from "./pages";

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
        path: "dashboard/*",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <AddBook /> },
          { path: "stats", element: <Stats /> },
          { path: "all-books", element: <AllBooks /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("darkTheme") === "true";
    document.body.classList.toggle("dark-theme", isDark);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
