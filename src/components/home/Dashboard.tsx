import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";
import { ReactNode } from "react";
interface prop {
  children: ReactNode;
}

function Dashboard({ children }: prop) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <Navbar></Navbar>
      <div className="min-h-[90vh] flex ">
        <Sidebar></Sidebar>
        <div className="grow overflow-auto shadow-lg shadow-gray-400  bg-white">
          {location.pathname === "/home" && children}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
