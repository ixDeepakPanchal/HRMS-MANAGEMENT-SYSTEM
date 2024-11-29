import { ReactNode, useState } from "react";
import { BsPersonSquare } from "react-icons/bs";
import { LiaHomeSolid } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import { CgOrganisation } from "react-icons/cg";
import { ImList2 } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { GoLightBulb } from "react-icons/go";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GrDocumentPerformance } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/AuthSlice";
import ShowModel from "../model/ShowModel";
import { Tooltip } from "antd";
import { Employee } from "../types/employeeDataType";

type SidebarData = {
  icon: ReactNode;
  link: string;
  title: string;
};

function Sidebar() {
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    dispatch(logoutUser());
    setIsModalOpen(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const iconsData: SidebarData[] = [
    { icon: <LiaHomeSolid size={24} />, link: "/home", title: "Home" },
    {
      icon: <BsPersonSquare size={20} />,
      link: "/myprofile",
      title: "My Profile",
    },

    {
      icon: <CgOrganisation size={24} />,
      link: "/employees",
      title: "Employees Detail",
    },

    { icon: <GoLightBulb size={24} />, link: "/plans", title: "Events" },
    {
      icon: <RiCalendarScheduleLine size={24} />,
      link: "/leavetrack",
      title: "Leave Track",
    },
    { icon: <ImList2 size={20} />, link: "/leave", title: "Leave" },
    { icon: <BiTask size={24} />, link: "/tasks", title: "Task" },
    { icon: <TbLogout size={24} />, link: "/logout", title: "Log Out" },
  ];

  if (myInfo.authInfo.email === "admin@mail.com") {
    iconsData.splice(3, 0, {
      icon: <GrDocumentPerformance size={20} />,
      link: "/performance",
      title: "Performance Report",
    });
  }
  return (
    <div className="min-w-[48px] md:min-w-16 bg-blue-200 grid grid-cols-1 grow">
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
