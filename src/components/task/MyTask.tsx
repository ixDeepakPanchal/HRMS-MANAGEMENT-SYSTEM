import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Employee, LeadReportData } from "../types/employeeDataType";
import { addTask } from "../../store/AuthSlice";
import toast from "react-hot-toast";
import SearchSelect from "../search/SearchSelect";
import { useState } from "react";

interface Task {
  assignTo: string;
  title: string;
  discription: string;

}

function MyTask() {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Task>({
    defaultValues: { assignTo: "", discription: "", title: "" },
    mode: "all"
  });
  const [userDepartment, setUserDepartment] = useState<string>("")
  const dispatch = useDispatch();
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const users = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const leadReporters = useSelector(
    (state: { auth: { leadReporters: LeadReportData[] } }) =>
      state.auth.leadReporters
  ).filter((item) => item.email === myInfo.authInfo.email);

  const assignOption = leadReporters[0]?.reportBy?.map((item) => ({ label: item, value: item }))

  const handleChangeValue = (email: string) => {

    const assignedUser = users.filter(employee => employee.authInfo.email === email)
    setUserDepartment(() => assignedUser[0]?.work?.department)

  }

  const onsubmit = (data: any) => {

    dispatch(
      addTask({ isCompleted: false, assignBy: myInfo.authInfo.email, department: userDepartment, ...data })
    );
    setUserDepartment(() => "")
    toast.success("Task assigned Successfully !");
    reset();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Task Manager</h1>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Task
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Task Assign To <span className="text-red-600 font-bold">*</span>
          </label>
          <Controller
            rules={{ required: "Please select employee" }}
            control={control}
            name={"assignTo"}
            render={({ field }) => <SearchSelect field={field} options={assignOption} placeHolder="select employee..." handleChangeValue={handleChangeValue} />}
          ></Controller>
          {errors.assignTo && (
            <p className="text-red-500 text-[12px]">
              {errors.assignTo.message}
            </p>
          )}

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Department <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            disabled
            value={userDepartment || ""}
            type="text"
            className="w-full text-[13px] h-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select Employee"
          />

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Task Title <span className="text-red-600 font-bold">*</span>
          </label>
          <input

            {...register("title", { required: "Enter Title" })}
            type="text"
            className="w-full text-[13px] h-8 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Title "
          />
          {errors.title && (
            <p className="text-red-500 text-[12px]">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Task Description <span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            {...register("discription", { required: "Enter subscription" })}
            className="w-full text-[13px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task description"
          />
          {errors.discription && (
            <p className="text-red-500 text-[12px]">
              {errors.discription.message}
            </p>
          )}
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
          Add Task
        </button>
      </form>


    </div>
  );
}

export default MyTask;
