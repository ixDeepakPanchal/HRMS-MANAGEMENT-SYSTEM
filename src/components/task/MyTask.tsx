import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../types/employeeDataType";
import { addTask } from "../../store/AuthSlice";
import toast from "react-hot-toast";

interface Task {
  assignTo: string;
  title: string;
  discription: string;
}

function MyTask() {
  const { register, handleSubmit, reset } = useForm<Task>();
  const dispatch = useDispatch();
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );
  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const onsubmit = (data: any) => {
    dispatch(
      addTask({ isCompleted: false, assignBy: myInfo.authInfo.email, ...data })
    );
    toast.success("Task assigned Successfully !");
    reset();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Task Manager</h1>

      {/* Add Task Section */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Task
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Task Assign To <span className="text-red-600 font-bold">*</span>
          </label>
          <select
            {...register("assignTo", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            {allEmployees.map(
              (employeeData: Employee, index: number) =>
                employeeData.authInfo.email !== "admin@mail.com" && (
                  <option key={index} value={`${employeeData.authInfo.email}`}>
                    {employeeData.authInfo.email}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Task Title <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Task Description <span className="text-red-600 font-bold">*</span>
          </label>
          <textarea
            {...register("discription", { required: true })}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
          Add Task
        </button>
      </form>

      {/* Show Task Section */}
    </div>
  );
}

export default MyTask;
