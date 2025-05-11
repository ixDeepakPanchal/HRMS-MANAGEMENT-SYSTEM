
import logo from "../../assets/company-logo.png";
import { Avatar, Popover, Select } from "antd";
import { BsPersonSquare } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/AuthSlice";
import { Employee } from "../types/employeeDataType";
import { IoPerson } from "react-icons/io5";

function Navbar() {
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const option = allEmployees?.map((employeeData: Employee) => {
    return {
      label: <div className="flex items-center gap-2"> <Avatar
        className="size-[3rem] rounded-full border border-white"
        icon={
          <>
            {employeeData?.profileImages?.myImage ? (
              <img
                src={`${myInfo?.profileImages?.myImage}`}
                alt="Uploaded"
                loading="lazy"
              />
            ) : (
              <IoPerson />
            )}
          </>
        }
      />{employeeData?.authInfo?.email}</div>, value: employeeData?.authInfo?.email
    }
  })

  return (
    <div className="h-[4rem]  bg-gray-800 shadow-sm shadow-gray-100 flex py-3 justify-between z-10 absolute inset-x-0">
      <div className="flex w-full ">
        <div className="h-full  object-fill border-gray-600 px-3 flex justify-center items-center">
          <img className="w-[12rem]" src={logo} alt="logo" onClick={() => navigate("/home")} />
        </div>
        <div className="grow flex justify-center items-center  ">
          <div className="w-[45%]">
            <Select
              className="w-full"
              showSearch
              placeholder="Search employees... "
              options={option}
              allowClear={true}
              optionRender={({ label }) => label}
              onChange={(value) => {
                navigate(`/employees/${value}`)
              }}
              labelRender={({ value }) => value}
            />
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center px-4 text-white ">
        <Popover
          content={
            <div className="text-sm text-gray-700 font-semibold cursor-pointer min-w-40">
              <div
                className="h-5 hover:border hover:bg-gray-800 hover:text-white p-4 rounded-md flex items-center"
                onClick={() => navigate("/myprofile")}
              >
                <BsPersonSquare className="mr-2" />
                My Profile
              </div>
              <div
                className="h-5 hover:border hover:bg-gray-800 hover:text-white p-4 rounded-md flex items-center"
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
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
                {myInfo?.profileImages?.myImage ? (
                  <img
                    src={`${myInfo?.profileImages?.myImage}`}
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
