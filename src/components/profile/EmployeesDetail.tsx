import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../types/employeeDataType";
import EmployeeTable from "./EmployeeTable";
import LoadingPage from "../loading/LoadingPage";
import { deleteEmployee } from "../../store/AuthSlice";
import ShowModel from "../model/ShowModel";

function EmployeesDetail() {
  const [employeeData, setEmployeeData] = useState<Employee | undefined>();
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
  }, [users, employeeData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    try {
      employeeData && dispatch(deleteEmployee(employeeData));
      setEmployeeData(undefined);
    } catch (error) {
    } finally {
      setLoading(true);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEmployeeData(undefined);
    setIsModalOpen(false);
  };

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="p-5 flex flex-col gap-3  bg-gray-50 ">
      <div className="">
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
          allEmployees={users}
          setEmployeeData={setEmployeeData}
        />
      </div>
    </div>
  );
}

export default EmployeesDetail;
