import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="min-h-screen bg-base-100 relative">
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setShowSidebar((prev) => !prev)} />

        {/* Sidebar Overlay */}
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
