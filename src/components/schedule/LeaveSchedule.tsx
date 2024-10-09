import { useEffect, useState } from "react";
import LeaveTable from "./LeaveTable";
import LoadingPage from "../loading/LoadingPage";
import { useSelector } from "react-redux";
import { Employee, LeaveData } from "../types/employeeDataType";

function LeaveShedule() {
  const [loading, setLoading] = useState<boolean>(true);
  const leaveData = useSelector(
    (state: { auth: { leaveData: LeaveData[] } }) => state.auth.leaveData
  );
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  let allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );

  useEffect(() => {
    setLoading(false);
  }, [leaveData,allEmployees,myInfo]);

  return (
    <div className="p-5">
      {loading ? (
        <LoadingPage />
      ) : (
        <LeaveTable leaveData={leaveData} myInfo={myInfo} allEmployees={allEmployees}/>
      )}
    </div>
  );
}

export default LeaveShedule;
