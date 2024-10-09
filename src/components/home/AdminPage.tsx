import { Empty } from "antd";
import Chart from "react-apexcharts";
import {
  FaUsers,
  FaCalendarAlt,
  FaCalendarDay,
  FaCalendarCheck,
} from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";
import { useState } from "react";
import AddEmployeeForm from "../edit/AddEmployeeForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Employee,
  hrEventsType,
  LeaveData,
  TodayEventsType,
} from "../types/employeeDataType";
import HrEventForm from "../edit/HrEventForm";

function AdminPage() {
  const [selectedForm, setSelectedForm] = useState<string | undefined>();
  const hrEvents = useSelector(
    (state: { auth: { hrEvents: hrEventsType[] } }) => state.auth.hrEvents
  );
  const todayEvents = useSelector(
    (state: { auth: { todayEvents: TodayEventsType[] } }) =>
      state.auth.todayEvents
  );
  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const leaveData = useSelector(
    (state: { auth: { leaveData: LeaveData[] } }) => state.auth.leaveData
  ).filter((leave: LeaveData) => leave.status === "approved").length;
  const navigate = useNavigate();

  const completedProjects = 40;
  const ongoingProjects = 10;
  const pendingProjects = 5;

  const projectProgressData = [
    completedProjects,
    ongoingProjects,
    pendingProjects,
  ];

  if (selectedForm === "addEmployee") {
    return <AddEmployeeForm setBackButton={setSelectedForm} />;
  } else if (selectedForm === "addEvent") {
    return (
      <HrEventForm
        setBackButton={setSelectedForm}
        selectedForm={selectedForm}
      />
    );
  } else if (selectedForm === "addFutureEvent") {
    return <HrEventForm setBackButton={setSelectedForm} />;
  } else {
    return (
      <div className="flex flex-col gap-8 p-6 bg-gray-50 ">
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
              onClick={() => {
                setSelectedForm("addEmployee");
              }}
            >
              <BsPlusCircle className="mr-2" /> Add Employee
            </button>
          </div>

          {/* On Leave Card */}
          <div className="flex flex-col p-5 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-800">
                On Leave
              </div>
              <FaCalendarDay className="text-4xl text-green-500" />
            </div>
            <div className="mt-4 text-4xl font-bold text-green-600">
              {leaveData}
            </div>
            <div className="border-b my-4"></div>
            <button
              className="mt-2 flex items-center justify-center text-green-600 hover:text-green-800 font-semibold"
              onClick={() => {
                navigate("/home/schedule");
              }}
            >
              <BsPlusCircle className="mr-2" /> Approve Leave
            </button>
          </div>

          {/* Today Event Card */}
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
                setSelectedForm("addEvent");
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
                setSelectedForm("addFutureEvent");
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
            <Chart
              options={{
                chart: {
                  type: "donut",
                },
                labels: [
                  "Completed Projects",
                  "Ongoing Projects",
                  "Pending Projects",
                ],
                colors: ["#22c55e", "#3b82f6", "#f97316"],
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ["#fff"],
                  },
                },
                legend: {
                  position: "bottom",
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      chart: {
                        height: "100%",
                      },
                    },
                  },
                ],
              }}
              series={projectProgressData}
              type="donut"
              height="100%"
            />
          </div>

          <div className="p-5 bg-white shadow-lg rounded-lg">
            <div className="text-xl font-semibold text-gray-800 mb-4">
              Employee Overview
            </div>
            <div className="h-[300px] flex justify-center items-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Detailed data coming soon!"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
