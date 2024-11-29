import { Empty } from "antd";
import { useSelector } from "react-redux";
import { hrEventsType, TodayEventsType } from "../types/employeeDataType";
import { FaStar } from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa";

function FutureEvents() {
  const todayDate = new Date()
  const hrEvents = useSelector(
    (state: { auth: { hrEvents: hrEventsType[] } }) => state.auth.hrEvents
  );

  const todayEvents = useSelector(
    (state: { auth: { todayEvents: TodayEventsType[] } }) =>
      state.auth.todayEvents
  ).filter(event => event.date === `${todayDate.getDate()}-${todayDate.getMonth() + 1}-${todayDate.getFullYear()}`);

  return (
    <div className="h-full grid grid-cols-1  p-4  bg-gray-50  space-y-6 overflow-auto">
      <div className="bg-white p-4 rounded-lg shadow-md overflow-auto ">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2 ">
          Today's Events <FaStar className="text-yellow-400" />
        </h2>
        {todayEvents.length ? (
          todayEvents?.map((event, index) => (
            <div key={index} className="border-l-4 border-yellow-500 pl-4 mb-4">
              <h3 className="text-lg font-semibold text-yellow-600 flex gap-2">
                {event.title}
                <div className="text-gray-500 flex gap-1">
                  <span>{event?.time?.start}</span>-
                  <span>{event?.time?.end}</span>
                </div>
              </h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center grow ">
            <Empty
              description="No  Event Added!"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          Upcoming HR Events
          <FaHourglassStart className="text-blue-500" />
        </h2>
        {hrEvents.length ? (
          hrEvents?.map((event, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-600">
                {event.title} -{" "}
                <span className="text-gray-500">{event.date}</span>
              </h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center grow ">
            <Empty
              description="No Upcoming Event Added!"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default FutureEvents;
