import { LeaveTypeData } from "../types/employeeDataType";
interface prop {
  leaveTypeData: LeaveTypeData;
}

function LeaveType({ leaveTypeData }: prop) {
  return (
    <div
      className={`border ${leaveTypeData.color} rounded-lg p-4 flex flex-col gap-3 md:gap-5 backdrop-blur-sm hover:shadow-xl `}
    >
      <div className="text-center font-semibold row-span-1">
        {leaveTypeData.title}
      </div>
      <div className="flex justify-center  items-center text-3xl lg:text-6xl md:text-5xl ">
        {leaveTypeData.icon}
      </div>
      <div className="row-span-2 grid grid-cols-2 items-center justify-items-center text-sm text-gray-600 px-4 font-semibold">
        <div>
          <div>Available</div>
          <div>Booked</div>
        </div>
        <div>
          <div>: {leaveTypeData.available}</div>
          <div>: {leaveTypeData.booked}</div>
        </div>
      </div>
    </div>
  );
}

export default LeaveType;
