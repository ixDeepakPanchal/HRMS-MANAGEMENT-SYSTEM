import { useEffect, useState } from "react";
import ProfileData from "./ProfileData";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../types/employeeDataType";
import { Avatar, FloatButton } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import EmployeeTable from "./EmployeeTable";
import LoadingPage from "../loading/LoadingPage";
import { LiaUserEditSolid } from "react-icons/lia";
import AddEmployeeForm from "../edit/AddEmployeeForm";
import { deleteEmployee } from "../../store/AuthSlice";
import ShowModel from "../model/ShowModel";

function EmployeesDetail() {
  const [employeeData, setEmployeeData] = useState<Employee>();
  const [showEdit, setShowEdit] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  let users = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );

  const searchData = useSelector(
    (state: { auth: { searchData: string } }) => state.auth.searchData
  );

  if (searchData) {
    users = users.filter((employee: Employee) =>
      employee.authInfo.email.startsWith(searchData)
    );
  }
  useEffect(() => {
    if (users) {
      setLoading(false);
    }
  }, [users]);

  const handleSelectedUser = (rowData: any) => {
    const employee = users.filter(
      (employee: Employee) => employee.authInfo.email === rowData.original.email
    )[0];
    setEmployeeData(employee);
  };
  const handleBackToDetail = () => {
    setEmployeeData(undefined);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      dispatch(deleteEmployee(employeeData));
      setEmployeeData(undefined);
    } catch (error) {
    } finally {
      setLoading(true);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return showEdit ? (
    <AddEmployeeForm setBackButton={setShowEdit} editData={employeeData} />
  ) : (
    <div className="border  p-5 flex flex-col gap-3 overflow-auto h-full bg-gray-50 ">
      {employeeData && !isModalOpen ? (
        <div className="relative w-full flex flex-col gap-3 bg-white">
          <div className="background-bg relative  h-[12rem] flex flex-col justify-center items-center p-4 rounded-md">
            <Avatar
              className="border border-white"
              size={112}
              icon={
                <>
                  {employeeData.profileImages?.myImage ? (
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
            {myInfo.authInfo.email === "admin@mail.com" && (
              <div
                className="absolute right-0 bottom-0 text-white font-bold flex justify-end items-center px-5 hover:cursor-pointer"
                onClick={() => {
                  setShowEdit("show");
                }}
              >
                <LiaUserEditSolid size={20} className="mr-2  rounded-full " />
                Edit Details
              </div>
            )}
          </div>
          <ProfileData myInfo={employeeData} />
          <FloatButton
            tooltip={<p>back to Employees Detail</p>}
            className="absolute top-[1vh] left-[1vw] size-8"
            icon={<IoMdArrowRoundBack className=" text-white" />}
            onClick={handleBackToDetail}
            type="primary"
          />
        </div>
      ) : (
        <div>
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              {" "}
              <ShowModel
                title={
                  <div className="text-gray-800 font-bold text-xl">
                    Confirmation Box
                  </div>
                }
                modelContent={
                  <div className="text-gray-700 font-semibold">
                    Are you Sure to Delete Employee ?
                  </div>
                }
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                handleOk={handleOk}
              />
              <EmployeeTable
                myInfo={myInfo}
                showModal={showModal}
                handleSelectedUser={handleSelectedUser}
                allEmployees={users}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeesDetail;
