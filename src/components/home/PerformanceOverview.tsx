import { Card, Button, Empty, Rate } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Employee, PerformaceType } from "../types/employeeDataType";
import { useNavigate } from "react-router-dom";
import ProgressCard from "./ProgressCard";

interface prop {
  myInfo?: Employee;
  currentUser?: Employee;
}

function PerformanceOverView({ myInfo, currentUser }: prop) {
  const navigate = useNavigate();

  const myPerformance = useSelector(
    (state: { auth: { employeePerformance: PerformaceType[] } }) =>
      state.auth.employeePerformance
  ).filter((item) => item.email === myInfo?.authInfo.email);

  const getOverallRate = () => {
    let overall =
      Number(myPerformance[0]?.taskCompletion) +
      Number(myPerformance[0]?.adherenceOfWork) +
      Number(myPerformance[0]?.attandanceReview) +
      Number(myPerformance[0]?.workQuality) +
      Number(myPerformance[0]?.workEfficiency);
    overall /= 100
    return overall;
  };
  return myPerformance.length ? (
    <div className="flex flex-col gap-8">
      <div className="relative text-2xl font-semibold text-gray-800 border text-center py-2 bg-white rounded-lg">
        PROGRESS OVERVIEW
        {currentUser?.authInfo.email === "admin@mail.com" && (
          <div
            className="absolute inset-y-0 right-[1vh] text-sm  flex items-center gap-1 cursor-pointer"
            onClick={() => navigate(`/performance/${myInfo?.authInfo.email}`)}
          >
            Edit <MdEdit color="blue" />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProgressCard
          data={myPerformance[0]?.taskCompletion}
          title="Task Completion"
        />

        <ProgressCard
          data={myPerformance[0]?.attandanceReview}
          title="Time Punctuality"
        />
        <ProgressCard
          data={myPerformance[0]?.adherenceOfWork}
          title="Adherence Of Work"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <ProgressCard
          data={myPerformance[0]?.workEfficiency}
          title="Work Efficiency "
        />

        <ProgressCard
          data={myPerformance[0]?.workQuality}
          title="Quality of Work"
        />
        <Card className="shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Overall Rating</h3>
          <div className="flex items-center ">
            <Rate disabled allowHalf value={getOverallRate()}></Rate>
            <span className="text-gray-800 font-bold text-lg ml-3">
              {getOverallRate()}/5
            </span>
          </div>
        </Card>
      </div>
      {myPerformance[0]?.feedback &&
        <Card className="shadow-lg rounded-lg p-3 bg-white">
          <h3 className="text-lg font-semibold mb-3 text-center">Feedback</h3>
          <p className="text-gray-700 text-base italic text-center">
            {myPerformance[0]?.feedback}
          </p>
        </Card>}
    </div>
  ) : !!currentUser ? (
    <div className="flex justify-center items-center h-72">
      <Card className="shadow-lg rounded-lg p-6 w-full h-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center">
          {currentUser.authInfo.email !== "admin@mail.com" ? (
            <Empty />
          ) : (
            <PlusOutlined style={{ fontSize: "3rem", color: "#4a4a4a" }} />
          )}
          <h2 className="text-xl font-semibold mt-4">No Performance Added</h2>

          {currentUser.authInfo.email === "admin@mail.com" && (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Add performance data to track progress
              </p>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/performance/${myInfo?.authInfo.email}`)
                }
                icon={<PlusOutlined />}
                size="large"
              >
                Add Performance
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  ) : (
    <></>
  );
}

export default PerformanceOverView;
