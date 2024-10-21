import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
type ResetPassword = {
    password: string
    confirmPassword: string
}

function ForgotPass() {
    const { handleSubmit, control, formState: { errors } } = useForm<ResetPassword>({ mode: "all" });

    const onSubmit = () => {

    }
    return (
        <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">
            {/* HRMS Text Background */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="text-[20vw] font-extrabold text-purple-500 opacity-15 tracking-widest">
                    HRMS
                </div>
            </div>
            <div className="relative z-10 border h-[25rem] w-[20rem] sm:min-w-[26rem] rounded-xl bg-white shadow-md shadow-gray-500 py-20 px-14 bg-opacity-40 backdrop-blur-[1px]">
                <div className="text-2xl font-bold mb-4 text-center">Reset Password</div>
                <form onSubmit={handleSubmit(onSubmit)} className=" h-full ">
                    <div className="flex flex-col h-full justify-center gap-3 ">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold" htmlFor="myEmailInput">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Controller rules={{ required: "Please enter password " }} name="password" control={control} render={({ field }) => <Input.Password {...field} className=" rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300" placeholder="Enter Email" />} />
                            {errors.password && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.password.message}
                                </p>
                            )}</div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold" htmlFor="myPasswordInput">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <Controller rules={{ required: "Please enter confirmpassword" }} name="confirmPassword" control={control} render={({ field }) => <Input.Password {...field}
                                className=" rounded-md p-2 h-[34px] drop-shadow-[0px_0px_17px_rgba(0,0,0,0.25)] shadow-gray-300" placeholder="Enter Password" />} />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.confirmPassword.message}
                                </p>
                            )}

                        </div>

                        <button
                            className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-6 hover:from-blue-700 hover:to-blue-700"
                            type="submit"
                        >
                            Reset
                        </button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass