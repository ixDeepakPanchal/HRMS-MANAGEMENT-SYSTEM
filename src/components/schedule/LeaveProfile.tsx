import { useSelector } from "react-redux";
import LeaveApplication from "./LeaveApplication";
import LeaveType from "./LeaveType";
import { Employee, LeaveData } from "../types/employeeDataType";
import { LeaveTypeData } from "../types/employeeDataType";
import {
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaRing,
  FaTrophy,
  FaClipboardList,
  FaStethoscope,
} from "react-icons/fa";

function LeaveProfile() {
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const leaveData = useSelector(
    (state: { auth: { leaveData: LeaveData[] } }) => state.auth.leaveData
  );

  const leaveType = [
    {
      title: "Total Leave",
      available: 20,
      booked: leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved"
      ).length,
      color: "bg-blue-100 border-blue-400",
      icon: <FaClipboardList className="text-blue-600" />,
    },
    {
      title: "Casual Leave",
      available: 2,
      booked: leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved" &&leave.type==="Casual Leave"
      ).length,
      color: "bg-green-100 border-green-400",
      icon: <FaCalendarCheck className="text-green-600" />,
    },
    {
      title: "Earned Leave",
      available: 2,
      booked: leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved" &&leave.type==="Earned Leave"
      ).length,
      color: "bg-yellow-100 border-yellow-400",
      icon: <FaUmbrellaBeach className="text-yellow-600" />,
    },
    {
      title: "Marriage Leave",
      available: 3,
      booked:leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved" &&leave.type==="Marriage Leave"
      ).length,
      color: "bg-pink-100 border-pink-400",

      icon: <FaRing className="text-pink-600" />,
    },
    {
      title: "Sick Leave",
      available: 10,
      booked: leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved" &&leave.type==="Sick Leave"
      ).length,
      color: "bg-orange-100 border-orange-400",

      icon: <FaStethoscope className="text-orange-600" />,
    },
    {
      title: "Milestone Leave",
      available: 3,
      booked:leaveData.filter(
        (leave: LeaveData) =>
          leave.email === myInfo.authInfo.email && leave.status === "approved" &&leave.type==="Milestone Leave"
      ).length,
      color: "bg-purple-100 border-purple-400",
      icon: <FaTrophy className="text-purple-600" />,
    },
  ];
  return (
    <div className="h-full px-10 py-6 flex flex-col gap-3 bg-gray-50 overflow-auto">
      <div className="flex flex-wrap justify-around gap-2">
        {leaveType?.map((leaveTypeData: LeaveTypeData, index: number) => (
          <LeaveType key={index} leaveTypeData={leaveTypeData} />
        ))}
      </div>
      <div className="border h-[700px] rounded-lg  bg-white ">
        <LeaveApplication myInfo={myInfo}></LeaveApplication>
      </div>
    </div>
  );
}

export default LeaveProfile;
