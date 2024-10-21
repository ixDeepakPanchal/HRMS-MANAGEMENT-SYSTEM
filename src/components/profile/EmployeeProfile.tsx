import { Avatar, FloatButton } from "antd";
import { IoPerson } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import ProfileData from "./ProfileData";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Employee } from "../types/employeeDataType";
import { useEffect, useState } from "react";
import PerformanceOverView from "../home/PerformanceOverview";

function EmployeeProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<Employee>();
  const { id } = useParams();
  const users = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  useEffect(() => {
    if (!!id) {
      const employee = users.filter(
        (employee) => employee.authInfo.email === id
      );
      setEmployeeData(employee[0]);
    }
  }, [employeeData,id]);

  return (
    <div className="p-5 flex flex-col gap-3  bg-gray-50 ">
      <div className="relative w-full flex flex-col gap-8 ">
        <div className="background-bg relative  h-[12rem] flex flex-col justify-center items-center p-4 rounded-md">
          <Avatar
            className="border border-white"
            size={112}
            icon={
              <>
                {employeeData?.profileImages?.myImage ? (
                  <img
                    src={`${employeeData.profileImages.myImage}`}
                    alt="Uploaded"
                    loading="lazy"
                  />
                ) : (
                  <IoPerson />
                )}
              </>
            }
          />
          {location.pathname === `/employees/${id}/performance` && (
            <div className="absolute w-full h-7 text-sm  bottom-0 grid grid-cols-3 justify-items-center text-white gap-8">
              <div>{employeeData?.authInfo?.email}</div>
              <div>{employeeData?.basicInfo?.firstName}</div>
              <div>{employeeData?.about?.role}</div>
            </div>
          )}

          {myInfo.authInfo.email === "admin@mail.com" &&
            location.pathname !== `/employees/${id}/performance` && (
              <div
                className="absolute right-0 bottom-0 text-white font-bold flex justify-end items-center px-5 hover:cursor-pointer"
                onClick={() =>
                  navigate(`/employees/${employeeData?.authInfo?.email}/edit`)
                }
              >
                <LiaUserEditSolid size={20} className="mr-2  rounded-full " />
                Edit Details
              </div>
            )}
        </div>
        {location.pathname === `/employees/${id}/performance` ? (
          <PerformanceOverView myInfo={employeeData} currentUser={myInfo} />
        ) : (
          <ProfileData myInfo={employeeData} />
        )}
        <FloatButton
          tooltip={<p>back to Employees Detail</p>}
          className="absolute top-[1vh] left-[1vw] size-8"
          icon={<IoMdArrowRoundBack className=" text-white" />}
          onClick={() => navigate("/employees")}
          type="primary"
        />
      </div>
    </div>
  );
}

export default EmployeeProfile;
