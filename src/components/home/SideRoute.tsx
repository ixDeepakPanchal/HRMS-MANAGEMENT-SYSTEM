import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";

function SideRoute() {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="min-h-[90vh] flex ">
        <Sidebar />
        <div className="grow shadow-lg shadow-gray-400  bg-white   overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SideRoute;
