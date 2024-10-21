import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, updatePassword } from "../../store/AuthSlice";
import { Employee } from "../types/employeeDataType";
import { Input } from "antd";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

type ResetPassword = {
  email: string;
  password: string;
  confirmPassword?: string;
}

function LoginPage() {
  const [isForgot, setIsForgot] = useState<boolean>(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );


  const { handleSubmit, control, formState: { errors }, watch, reset } = useForm<ResetPassword>({ mode: "all" });

  const emailValue = watch("email")
  const passwordValue = watch("password")


  const onSubmit = (data: ResetPassword) => {

    const user = allUsers.filter(
      (user: Employee) => user?.authInfo?.email === data.email
    );

    if (user.length === 0) {
      toast.error("User doesn't exist");
      return;
    }

    if (isForgot) {
      if (data.password !== data.confirmPassword) {
        return toast.error("Password and confirm Password doesn't match !");
      }

      const updateUser = {
        ...user[0],
        authInfo: {
          ...user[0].authInfo,
          password: passwordValue,
        },
      }

      dispatch(updatePassword(updateUser));
      reset({ email: emailValue, password: "", confirmPassword: "" })
      setIsForgot(() => false)
      return toast.success("Password Reset Successfully !");
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
      <div className="relative z-10 border min-h-[30rem] w-[20rem] sm:min-w-[26rem] rounded-xl bg-white shadow-md shadow-gray-500 py-20 px-14 bg-opacity-40 backdrop-blur-[1px]">
        <div className="text-2xl font-bold mb-4 text-center">  {isForgot ? "Reset Password" : "Login"}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor="myEmailInput">
                Email <span className="text-red-500">*</span>
              </label>
              <Controller rules={{ required: "Please enter email ", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "invalid email address" } }} name="email" control={control} render={({ field }) => <Input {...field} className=" rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300" placeholder="Enter Email" />} />
              {errors.email && (
                <p className="text-red-500 text-[12px]">
                  {errors.email.message}
                </p>
              )}</div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor="myPasswordInput">
                Password <span className="text-red-500">*</span>
              </label>
              <Controller rules={{ required: "Please enter password", minLength: { value: 6, message: "Password must have 6 characters !" } }} name="password" control={control} render={({ field }) => <Input.Password {...field} disabled={!emailValue || !!errors.email}
                className=" rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300" placeholder="Enter Password" />} />
              {errors.password && (
                <p className="text-red-500 text-[12px]">
                  {errors.password.message}
                </p>
              )}

            </div>
            {isForgot && <div className="flex flex-col gap-1">
              <label className="text-sm font-bold" htmlFor="myPasswordInput">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <Controller rules={{
                required: "Please enter confirm password",
                validate: (value) =>
                  value === passwordValue || "Password doesn't match",
              }} name="confirmPassword" control={control} render={({ field }) => <Input.Password {...field} disabled={!passwordValue || !!errors.password}
                className=" rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300" placeholder="Enter confirm Password" />} />
              {errors.confirmPassword && (
                <p className="text-red-500 text-[12px]">
                  {errors.confirmPassword.message}
                </p>
              )}

            </div>}
            <div className={`text-end text-red-500 text-sm font-bold ${emailValue && !(!!errors.email) ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={() => {
              if (emailValue && !(!!errors.email)) {
                reset({ email: emailValue, password: "", confirmPassword: "" })
                setIsForgot(
                  () => !isForgot
                )
              }
            }}>
              {isForgot ? "back to Login" : "Forgot password ?"}
            </div>

            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700"
              type="submit"
            >
              {isForgot ? "Reset" : "Login"}
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
