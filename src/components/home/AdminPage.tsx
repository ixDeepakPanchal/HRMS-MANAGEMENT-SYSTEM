
import Chart from "react-apexcharts";
import {
  FaUsers,
  FaCalendarAlt,
  FaCalendarDay,
  FaCalendarCheck,
} from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Employee,
  hrEventsType,
  LeaveData,
  TaskDataType,
  TodayEventsType,
} from "../types/employeeDataType";

function AdminPage() {
  const date = new Date()
  const navigate = useNavigate();
  const hrEvents = useSelector(
    (state: { auth: { hrEvents: hrEventsType[] } }) => state.auth.hrEvents
  );
  const todayEvents = useSelector(
    (state: { auth: { todayEvents: TodayEventsType[] } }) =>
      state.auth.todayEvents
  );
  const taskData = useSelector(
    (state: { auth: { taskData: TaskDataType[] } }) => state.auth.taskData
  );
  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const leaveData = useSelector(
    (state: { auth: { leaveData: LeaveData[] } }) => state.auth.leaveData
  ).filter((leave: LeaveData) => leave.status === "approved" && leave.date === `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`).length;

  const moeiEmployees = allEmployees.filter(item => item.work.department === "MOEI").length
  const doeEmployees = allEmployees.filter(item => item.work.department === "DOE").length
  const dmsEmployees = allEmployees.filter(item => item.work.department === "DMS").length
  const internEmployees = allEmployees.filter(item => item.work.department === "INTERN").length
  const managementEmployees = allEmployees.filter(item => item.work.department === "MANAGEMENT").length

  const getTotalTask = (department: string): number => {
    return taskData.filter(task => task.department === department).length
  }
  const getCompletedTask = (department: string): number => {
    return taskData.filter(task => task.department === department && task.isCompleted === true).length
  }

  const totalTasks = [getTotalTask("MOEI"), getTotalTask("DOE"), getTotalTask("DMS"), getTotalTask("INTERN"), getTotalTask("MANAGEMENT")];
  const completedTasks = [getCompletedTask("MOEI"), getCompletedTask("DOE"), getCompletedTask("DMS"), getCompletedTask("INTERN"), getCompletedTask("MANAGEMENT")];

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 h-full ">
      <div className="text-3xl font-semibold text-gray-800">HR Dashboard</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              Total Employees
            </div>
            <FaUsers className="text-4xl text-blue-500" />
          </div>
          <div className="mt-4 text-4xl font-bold text-blue-600">
            {allEmployees.length}
          </div>
          <div className="border-b my-4"></div> {/* Bottom border */}
          <button
            className="mt-2 flex items-center justify-center text-blue-600 hover:text-blue-800 font-semibold"
            onClick={() => navigate("/home/addEmployee")}
          >
            <BsPlusCircle className="mr-2" /> Add Employee
          </button>
        </div>

        <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">On Leave</div>
            <FaCalendarDay className="text-4xl text-green-500" />
          </div>
          <div className="mt-4 text-4xl font-bold text-green-600">
            {leaveData}
          </div>
          <div className="border-b my-4"></div>
          <button
            className="mt-2 flex items-center justify-center text-green-600 hover:text-green-800 font-semibold"
            onClick={() => {
              navigate("/leavetrack");
            }}
          >
            <BsPlusCircle className="mr-2" /> Approve Leave
          </button>
        </div>

        <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              Today Event
            </div>
            <FaCalendarCheck className="text-4xl text-yellow-500" />
          </div>
          <div className="mt-4 text-4xl font-bold text-yellow-600">
            {todayEvents.length}
          </div>
          <div className="border-b my-4"></div>
          <button
            className="mt-2 flex items-center justify-center text-yellow-600 hover:text-yellow-800 font-semibold"
            onClick={() => {
              navigate("/home/addEvent");
            }}
          >
            <BsPlusCircle className="mr-2" /> Add Event
          </button>
        </div>

        {/* Future Event Card */}
        <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">
              Future Event
            </div>
            <FaCalendarAlt className="text-4xl text-red-500" />
          </div>
          <div className="mt-4 text-4xl font-bold text-red-600">
            {hrEvents.length}
          </div>
          <div className="border-b my-4"></div>
          <button
            className="mt-2 flex items-center justify-center text-red-600 hover:text-red-800 font-semibold"
            onClick={() => {
              navigate("/home/addFutureEvent");
            }}
          >
            <BsPlusCircle className="mr-2" /> Add Future Event
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Project Progress Overview
          </div>
          <div className="h-[300px]">
            <Chart
              options={{
                chart: {
                  type: "bar",
                },
                xaxis: {
                  categories: ["MOEI", "DOE", "DMS", "INTERN", "MANAGEMENT"],
                },
                colors: ["#3b82f6", "#22c55e"],
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: false,
                    dataLabels: {
                      position: "top",
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ["#000"],
                  },
                },
                legend: {
                  position: "bottom",
                },
              }}
              series={[
                {
                  color: "#815ac0",
                  name: "Total Tasks",
                  data: totalTasks,
                },
                {
                  name: "Completed Tasks",
                  data: completedTasks,
                },
              ]}
              type="bar"
              height="300px"
            />
          </div>
        </div>

        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="text-xl font-semibold text-gray-800 mb-4">Employee Overview</div>
          <div className="h-[300px]">
            <Chart
              options={{
                chart: {
                  type: "bar",
                },
                xaxis: {
                  categories: ["MOEI", "DOE", "DMS", "INTERN", "MANAGEMENT"],
                },
                colors: ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#815ac0"],
                plotOptions: {
                  bar: {
                    distributed: true,
                    borderRadius: 4,
                    horizontal: false,
                  },
                },
              }}
              series={[
                {
                  name: "Employees",
                  data: [moeiEmployees, doeEmployees, dmsEmployees, internEmployees, managementEmployees],
                },
              ]}
              type="bar"
              height="300px"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminPage;
