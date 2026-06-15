import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../Components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-base)] transition-colors duration-300">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
