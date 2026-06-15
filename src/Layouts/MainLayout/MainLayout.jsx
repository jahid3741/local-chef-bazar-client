import React from "react";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import { Outlet } from "react-router"; 
import Footer from "../../Components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    // 1. Added global background and text colors with smooth transitions for Dark Mode
    <div className="min-h-screen flex flex-col bg-base-100 dark:bg-gray-900 text-base-content dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      {/* 2. Upgraded padding (px-4 -> sm:px-6 -> lg:px-8) to match the exact spacing of your other sections */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
