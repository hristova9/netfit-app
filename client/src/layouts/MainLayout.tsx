import React, { ReactNode, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.styles.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content-area">{children}</div>
    </div>
  );
};

export default MainLayout;
