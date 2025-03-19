import React, { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./MainLayout.styles.css";

interface MainLayoutProps {
    children: ReactNode;  // This type allows any valid JSX elements to be passed as children
  }

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="content-area">
        {children} {/* Content area on the right */}
      </div>
    </div>
  );
};

export default MainLayout;
