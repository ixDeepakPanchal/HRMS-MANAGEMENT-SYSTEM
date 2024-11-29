import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";

function SideRoute() {
  return (
    <div className="flex flex-col min-h-[100svh] ">
      <Navbar />
      <div className="h-[100svh] flex pt-[4rem]">
        <Sidebar />
        <div className="grow shadow-lg shadow-gray-400  bg-white  w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SideRoute;
