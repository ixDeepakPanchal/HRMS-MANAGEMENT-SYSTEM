import { useForm } from "react-hook-form";
import { Employee } from "../types/employeeDataType";
import { useDispatch } from "react-redux";
import { addLeave } from "../../store/AuthSlice";
import toast from "react-hot-toast";
type LeaveFormType = {
  type: string;
  title: string;
  date: string;
};
interface prop {
  myInfo: Employee;
}

function LeaveApplication({ myInfo }: prop) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeaveFormType>({
    mode: "all"
  });
  const dispatch = useDispatch();
  const onsubmit = (data: LeaveFormType) => {
    const leave = {
      id: myInfo.authInfo.id,
      email: myInfo.authInfo.email,
      ...data,
      status: "pending",
    };
    dispatch(addLeave(leave));
    toast.success("Leave Apply Successfully");
    reset();
  };

  return (
    <div className="bg-white  rounded-lg p-6 mt-4 w-full">
      <form onSubmit={handleSubmit(onsubmit)}>
        <h2 className="text-xl font-semibold mb-4">Leave Application</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-800"
            >
              Leave Reason <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              {...register("title", { required: "Please enter reason" })}
              type="text"
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Enter reason"
            />
            {errors.title && (
              <p className="text-red-500 text-[12px]">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium text-gray-800">
              Type <span className="text-red-500 font-semibold">*</span>
            </label>
            <select
              {...register("type", { required: "Select leave type" })}
              className="border border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="Marriage Leave">Marriage Leave</option>
              <option value="Milestone Leave">Milestone Leave</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-[12px]">
                {errors.type.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-800">
              Date <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              {...register("date", { required: "Please select a date" })}
              type="date"
              className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.date && (
              <p className="text-red-500 text-[12px]">
                {errors.date.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveApplication;
