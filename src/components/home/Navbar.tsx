import Search from "antd/es/transfer/search";
import logo from "../../assets/company-logo.png";
import { Avatar, Popover } from "antd";
import { BsPersonSquare } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setSearch } from "../../store/AuthSlice";
import { Employee } from "../types/employeeDataType";
import { IoPerson } from "react-icons/io5";

function Navbar() {
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="h-[4rem]  bg-gray-800 shadow-sm shadow-gray-100 flex py-3 justify-between z-10">
      <div className="flex">
        <div className="h-full border-r  object-fill border-gray-600 px-3 flex justify-center items-center">
          <img className="w-[12rem]" src={logo} alt="logo" />
        </div>
        <div className="flex justify-center items-center px-3">
          <Search
            placeholder="search employee.."
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
        </div>
      </div>
      <div className=" flex justify-center items-center px-4 text-white">
        <Popover
          content={
            <div className="text-sm text-gray-700 font-semibold cursor-pointer min-w-40">
              <div
                className="h-5 hover:border hover:bg-gray-800 hover:text-white p-4 rounded-md flex items-center"
                onClick={() => navigate("/home/myprofile")}
              >
                <BsPersonSquare className="mr-2" />
                My Profile
              </div>
              <div
                className="h-5 hover:border hover:bg-gray-800 hover:text-white p-4 rounded-md flex items-center"
                onClick={() => dispatch(logoutUser())}
              >
                <TbLogout size={18} className="mr-2" />
                Log Out
              </div>
            </div>
          }
        >
          <Avatar
            className="size-[3rem] rounded-full border border-white"
            icon={
              <>
                {myInfo.profileImages?.myImage ? (
                  <img
                    src={`${myInfo.profileImages.myImage}`}
                    alt="Uploaded"
                    loading="lazy"
                  />
                ) : (
                  <IoPerson />
                )}
              </>
            }
          />
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
