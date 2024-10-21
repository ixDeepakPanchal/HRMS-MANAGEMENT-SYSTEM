import { Empty, Steps } from "antd";
import Chart from "react-apexcharts";
import { IoMdTime } from "react-icons/io";
import { FaTasks, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Employee, LeaveData, TaskDataType } from "../types/employeeDataType";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { setTaskStatus } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import PerformanceOverView from "./PerformanceOverview";

const HomePage = () => {
  const { Step } = Steps;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const taskData = useSelector(
    (state: { auth: { taskData: TaskDataType[] } }) => state.auth.taskData
  ).filter((task) => task.assignTo === myInfo.authInfo.email);

  const leaveData = useSelector(
    (state: { auth: { leaveData: LeaveData[] } }) => state.auth.leaveData
  ).filter(
    (leave: LeaveData) =>
      leave.email === myInfo.authInfo.email && leave.status === "approved"
  );

  const completedTasks = taskData.filter((task) => task.isCompleted).length;
  const pendingTasks = taskData.length - completedTasks;
  const chartData = [completedTasks, pendingTasks];

  const handleTaskStatus = (task: TaskDataType) => {
    dispatch(
      setTaskStatus({
        taskId: task.taskId,
        data: { ...task, isCompleted: !task.isCompleted },
      })
    );
  };

  return (
    <div className="flex flex-col gap-8 p-5 bg-gray-50 ">
      <div className="text-3xl font-semibold text-gray-800 flex justify-between items-center">
        Hi {myInfo.basicInfo?.firstName || "User"}!{" "}
        <span
          className="border bg-blue-400 rounded-md text-white text-base p-2 flex gap-2 items-center hover:cursor-pointer"
          onClick={() => navigate("/home/calendar")}
        >
          <IoMdTime size={20} className="text-gray-800" /> Track Attendance
        </span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-white">
        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="border-l-4 border-yellow-500 p-2">
            <div className="flex items-center justify-between text-gray-800 font-bold h-8">
              Total Leave
              <IoMdTime size={32} className="text-yellow-500 " />
            </div>
            <div className="text-3xl text-yellow-600 font-bold">
              {leaveData.length ? `${leaveData.length} Days` : "0 Day"}
            </div>
          </div>
        </div>

        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="border-l-4 border-blue-500 p-2">
            <div className="flex items-center justify-between text-gray-800 font-bold h-8">
              Total Task
              <FaTasks size={26} className="text-blue-500 " />
            </div>
            <div className="text-3xl text-blue-600 font-bold">
              {taskData.length ? `${taskData.length} Tasks` : "0 Task"}
            </div>
          </div>
        </div>

        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="border-l-4 border-green-500 p-2">
            <div className="flex items-center justify-between text-gray-800 font-bold h-8">
              Task Completed
              <FaCheckCircle size={28} className="text-green-500" />
            </div>
            <div className="text-3xl text-green-600 font-bold">
              {completedTasks ? `${completedTasks} Tasks` : "0 Task"}
            </div>
          </div>
        </div>

        <div className="p-5 bg-white shadow-lg rounded-lg">
          <div className="border-l-4 border-orange-500 p-2">
            <div className="flex items-center justify-between text-gray-800 font-bold h-8">
              Task Pending
              <FaExclamationCircle size={28} className="text-orange-500 " />
            </div>
            <div className="text-3xl text-orange-600 font-bold">
              {pendingTasks ? `${pendingTasks} Tasks` : "0 Task"}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
        <div className="p-4 rounded-xl overflow-y-auto h-[300px] bg-white shadow-lg">
          <h2 className="text-lg font-extrabold text-[#7b2cbf] mb-4">
            Tasks for Today
          </h2>
          {taskData?.length ? (
            <Steps
              direction="vertical"
              current={taskData.length} // or use a condition to show current steps
              className="custom-steps"
            >
              {taskData.map((event: TaskDataType, index: number) => (
                <Step
                  key={index}
                  title={
                    <div className="font-bold text-gray-700 text-lg flex justify-between gap-5 w-full">
                      {event.title}{" "}
                      <input
                        className={`${!event.isCompleted && "cursor-pointer"}`}
                        type="checkbox"
                        disabled={event.isCompleted}
                        checked={event.isCompleted}
                        onChange={() => handleTaskStatus(event)}
                      />
                    </div>
                  }
                  description={
                    <p className="text-gray-600 font-normal ">
                      {event.discription}
                    </p>
                  }
                  icon={
                    event.isCompleted ? (
                      <FiCheckCircle style={{ color: "green" }} />
                    ) : (
                      <AiOutlineClockCircle style={{ color: "orange" }} />
                    )
                  }
                  status={event.isCompleted === true ? "finish" : "process"}
                />
              ))}
            </Steps>
          ) : (
            <div className="flex justify-center items-center ">
              <Empty
                description="No tasks for today!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>

        <div className=" p-4 h-[300px] bg-white rounded-xl shadow-lg ">
          <h2 className="text-lg font-extrabold text-yellow-700 mb-4">
            Tasks Overview
          </h2>
          {taskData.length ? (
            <Chart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Task Completed", "Task Pending"],
                colors: ["#22c55e", "#f97316"],
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
              series={chartData}
              type="pie"
              height={"100%"}
            />
          ) : (
            <div className="flex justify-center items-center  ">
              <Empty
                description="No tasks for today!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
      </div>
      <PerformanceOverView myInfo={myInfo} />
    </div>
  );
};

export default HomePage;
