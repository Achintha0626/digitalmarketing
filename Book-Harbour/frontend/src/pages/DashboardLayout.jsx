
import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";
import customFetch from "../utils/customFetch";

const DashboardContext = createContext();
export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboardContext must be used within DashboardLayout");
  return ctx;
};

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(
    () => localStorage.getItem("darkTheme") === "true"
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await customFetch.get("/users/show-me");
        setUser(data.user);
      } catch (err) {
        console.error(err);
       
        navigate("/login", { replace: true });
      }
    }
    fetchUser();
  }, [navigate]);

  
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    setIsDarkTheme((prev) => {
      const next = !prev;
      localStorage.setItem("darkTheme", next);
      return next;
    });
  };

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        isDarkTheme,
        toggleDarkTheme,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
