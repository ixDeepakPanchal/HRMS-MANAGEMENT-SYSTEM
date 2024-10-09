import { ReactNode, useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import { LiaHomeSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import { CgOrganisation } from "react-icons/cg";
import { ImList2 } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { GoLightBulb } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/AuthSlice";
import ShowModel from "../model/ShowModel";
import {  Tooltip } from "antd";

type SidebarData = {
  icon: ReactNode;
  link: string;
  title: string;
};

function Sidebar() {
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(logoutUser());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iconsData: SidebarData[] = [
    { icon: <LiaHomeSolid size={24} />, link: "/home", title: "Home" },
    {
      icon: <BsPersonSquare size={20} />,
      link: "/home/myprofile",
      title: "My Profile",
    },
    {
      icon: <CgOrganisation size={24} />,
      link: "/home/employees",
      title: "Employees Detail",
    },
    { icon: <GoLightBulb size={24} />, link: "/home/plans", title: "Events" },
    {
      icon: <RiCalendarScheduleLine size={24} />,
      link: "/home/schedule",
      title: "Leave Track",
    },
    { icon: <ImList2 size={20} />, link: "/home/leave", title: "Leave" },
    { icon: <BiTask size={24} />, link: "/home/tasks", title: "Task" },
    { icon: <TbLogout size={24} />, link: "/logout", title: "Log Out" },
  ];

  return (
    <div className="min-w-[48px] md:min-w-16 bg-blue-200 grid grid-cols-1 ">
      <ShowModel
        title={<div className="text-gray-800 font-bold text-xl">Log Out !</div>}
        modelContent={
          <div className="text-gray-700 font-semibold">
            Are you Sure to LogOut ?
          </div>
        }
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      {iconsData.map((icon: SidebarData, index) => (
        <Tooltip
          key={index}
          title={
            <div className="text-sm flex items-center font-semibold">
              {icon.title}
            </div>
          }
          placement="right"
        >
          <div
            className={`size-[3rem] md:size-[4rem] font-semibold text-gray-700 flex justify-center items-center cursor-pointer ${
              icon.link === location.pathname && "bg-white rounded-l-3xl ml-2"
            } `}
            onClick={() => {
              if (icon.link === "/logout") {
                showModal();
              } else {
                navigate(icon.link);
              }
            }}
          >
            {icon.icon}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

export default Sidebar;
