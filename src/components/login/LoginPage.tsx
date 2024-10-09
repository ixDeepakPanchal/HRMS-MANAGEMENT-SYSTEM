import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  loginUser } from "../../store/AuthSlice";
import { Employee } from "../types/employeeDataType";

type LoginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );

  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    const user = allUsers.filter(
      (user: Employee) => user?.authInfo?.email === data.email
    );

    if (user.length === 0) {
      toast.error("User doesn't exist");
      return;
    }
    if (user[0]?.authInfo?.password !== data?.password) {
      toast.error("Password doesn't match!");
      return;
    }
    toast.success("Successfully Login!");
    dispatch(loginUser(user[0]));
    navigate("home");
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* HRMS Text Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-[20vw] font-extrabold text-purple-500 opacity-15 tracking-widest">
          HRMS
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 border h-[30rem] w-[20rem] sm:min-w-[26rem] rounded-xl bg-white shadow-md shadow-gray-500 py-20 px-14 bg-opacity-40 backdrop-blur-[1px]">
        <div className="text-2xl font-bold mb-4">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor="myEmailInput">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="myEmailInput"
                className="border border-gray-400 rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300"
                type="email"
                placeholder="test@example.com"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor="myPasswordInput">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="myPasswordInput"
                className="border border-gray-400 rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
            <div className="text-end text-red-500 text-sm font-bold">
              Forgot password?
            </div>

            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700"
              type="submit"
            >
              Login
            </button>
            <div className="text-gray-600 text-center font-bold">OR</div>
            <div className="text-blue-600 text-center font-bold">
              Don't have an account? Sign Up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
