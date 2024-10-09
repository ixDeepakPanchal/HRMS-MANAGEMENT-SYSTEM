import { Calendar, CalendarProps, Tooltip } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AttendanceType, Employee } from "../types/employeeDataType";
import { addAttendance, updateAttendance } from "../../store/AuthSlice";

function CalendarAttandance() {
  const currentDate = new Date();
  const [selectedMode, setSelectedMode] = useState<"month" | "year">("month");

  const dispatch = useDispatch();
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const attendanceList = useSelector(
    (state: { auth: { attendanceList: AttendanceType[] } }) =>
      state.auth.attendanceList
  );

  const handlePanelChange = (_: Dayjs, mode: "month" | "year") => {
    setSelectedMode(mode);
  };
  const handleOnSelect = (
    day: Dayjs,
    info: { source: "year" | "month" | "date" | "customize" }
  ) => {
    console.log(info, day);
    if (info.source === "month") {
      setSelectedMode("month");
    } else {
    }
  };

  const dateCellRender = (value: Dayjs) => {
    const calenderDate = `${value.year()}/${value.month()}/${value.date()}`;
    const listData = attendanceList.filter(
      (list: AttendanceType) =>
        list.date === calenderDate && list.id === myInfo.authInfo.id
    );

    return (
      <div className="size-full pb-2">
        {listData.length ? (
          listData.map((list: AttendanceType, index: number) => (
            <div
              className="size-full grid grid-cols-1 justify-center gap-2  items-center   "
              key={index}
            >
              <span className="text-sm flex gap-2 items-center border w-full rounded-md h-full bg-gray-100 px-2">
                <span className="text-[14px] font-semibold text-gray-900">
                  {" "}
                  {list.checkIn || "00:00"}
                </span>
                <span className="flex items-center gap-1 justify-end text-gray-700 font-semibold">
                  Logged In <IoMdLogIn color="green" />
                </span>{" "}
              </span>
              <span className="text-sm flex gap-2  items-center border w-full rounded-md h-full bg-gray-100 px-2 ">
                <span className="text-[14px] font-semibold text-gray-900">
                  {" "}
                  {list.checkOut || "--:--"}
                </span>

                <span className="flex items-center gap-1 justify-end text-gray-700 font-semibold">
                  Logged Out <IoMdLogOut color="red" />
                </span>
              </span>
            </div>
          ))
        ) : value.day() === 6 || value.day() === 0 ? (
          <div className="size-full bg-gray-50 rounded-md flex justify-center items-center">
            {/* <FaClock size={20} color="orange" /> */}
          </div>
        ) : (
          value.isBefore(currentDate, "date") && (
            <div className="size-full bg-red-50 rounded-md flex justify-center items-center">
              <ImCross size={20} color="red" />
            </div>
          )
        )}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const handleCheckIn = () => {
    dispatch(
      addAttendance({
        id: myInfo.authInfo.id,
        date: `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`,
        checkIn: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      })
    );
  };
  const handleCheckOut = () => {
    dispatch(
      updateAttendance({
        id: myInfo.authInfo.id,
        date: `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`,
        checkOut: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      })
    );
  };
  const handleDisableCheckOut = () => {
    const attendance = attendanceList?.filter(
      (item) =>
        item.id === myInfo.authInfo.id &&
        item.date ===
          `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`
    )[0];
    if (!attendance?.checkOut && attendance?.checkIn) {
      return true;
    }

    return false;
  };
  const handleDisableCheckIn = () => {
    if (
      attendanceList.filter(
        (item) =>
          item.id === myInfo.authInfo.id &&
          item.date ===
            `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`
      ).length === 0
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className="p-5 h-full ">
      <div className="h-20 border rounded-md flex justify-between items-center px-4 bg-blue-400">
        <span className="text-2xl font-bold text-white">
          Attendance Tracker
        </span>
        <div className="flex h-full items-center gap-4">
          <Tooltip
            title={<div className="font-semibold text-white">Log In</div>}
            placement="bottom"
          >
            <button
              disabled={!handleDisableCheckIn()}
              className={` h-[50%]   flex justify-center items-center bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-md  ${
                handleDisableCheckIn()
                  ? "transition-transform transform  active:scale-90 active:shadow-lg  hover:from-green-400  hover:to-green-600  "
                  : "from-green-400 to-green-400 cursor-not-allowed"
              } px-2 `}
              onClick={() => {
                handleDisableCheckIn() && handleCheckIn();
              }}
            >
              <span className="flex gap-1 text-white">
                <span className="font-bold">Log In</span>
                <IoMdLogIn size={25} className="text-white" />
              </span>
            </button>
          </Tooltip>
          <Tooltip
            title={<div className="font-semibold text-white">Log Out</div>}
            placement="bottom"
          >
            <button
              disabled={!handleDisableCheckOut()}
              className={`text-white font-semibold h-[50%]  px-2 flex justify-center items-center bg-gradient-to-r  rounded-md shadow-md ${
                handleDisableCheckOut()
                  ? "transition-transform transform  active:scale-90 active:shadow-lg from-orange-500 to-orange-600 hover:from-orange-400  hover:to-orange-600"
                  : "from-orange-400 to-orange-400 cursor-not-allowed"
              }`}
              onClick={() => {
                handleDisableCheckOut() && handleCheckOut();
              }}
            >
               <span className="flex gap-1 text-white">
                <span className="font-bold">Log Out</span>
                <IoMdLogOut size={25} className="text-white" />
              </span>
            </button>
          </Tooltip>
        </div>
      </div>
      <Calendar
        locale={{
          lang: {
            locale: "en_US",
            placeholder: "Select date",
            rangePlaceholder: ["Start date", "End date"],
            today: "Today",
            now: "Now",
            backToToday: "Back to today",
            ok: "OK",
            clear: "Clear",
            month: "Month",
            year: "Year",
            timeSelect: "Select time",
            dateSelect: "Select date",
            monthSelect: "Choose a month",
            yearSelect: "Choose a year",
            decadeSelect: "Choose a decade",
            yearFormat: "YYYY",
            dateFormat: "M/D/YYYY",
            dayFormat: "D",
            dateTimeFormat: "M/D/YYYY HH:mm:ss",
            monthFormat: "MMMM",
            monthBeforeYear: true,
            previousMonth: "Previous month (PageUp)",
            nextMonth: "Next month (PageDown)",
            previousYear: "Last year (Control + left)",
            nextYear: "Next year (Control + right)",
            previousDecade: "Last decade",
            nextDecade: "Next decade",
            previousCentury: "Last century",
            nextCentury: "Next century",
            shortWeekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            shortMonths: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          timePickerLocale: {
            placeholder: "Select time",
          },
          dateFormat: "YYYY-MM-DD",
          dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
          weekFormat: "YYYY-wo",
          monthFormat: "YYYY-MM",
        }}
        mode={selectedMode}
        onSelect={handleOnSelect}
        onPanelChange={handlePanelChange}
        cellRender={cellRender}
        disabledDate={(date: Dayjs) =>
          date.day() === 0 || date.day() === 6 ? true : false
        }
      />
    </div>
  );
}

export default CalendarAttandance;
