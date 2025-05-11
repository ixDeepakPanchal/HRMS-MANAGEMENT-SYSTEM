import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { employeeSchema, SchemaType } from "../schema/employeeSchema";
import SearchSelect from "../search/SearchSelect";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../types/employeeDataType";
import { addEmployee, loginUser } from "../../store/AuthSlice";

const EmployeeSignup = () => {
  const allUsers = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SchemaType>({
    mode: "all",
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      authInfo: {
        id: "",
      },
      about: {
        role: "Software Intern",
        service: "Middleware",
        office: "Hydrabad",
      },
      work: {
        title: "Employee",
        department: "INTERN",
        reportingTo: "admin@mail.com",
      },
      profileImages:{
        myImage : ""
      }
    },
  });

  const [currentStep, setCurrentStep] = useState(0);

  const emailId = watch("authInfo.email");
  const password = watch("authInfo.password");
  const firstName = watch("basicInfo.firstName");
  const lastName = watch("basicInfo.lastName");
  const gender = watch("personal.gender");

  const getUserExist = () => {
    const userExist = allUsers.find(
      (user) => user?.authInfo?.email === emailId
    );
    return !!userExist;
  };

  useEffect(() => {
    if (allUsers.length > 0) {
      const newUserData = allUsers.find(
        (user) => user?.authInfo?.email === emailId
      );

      if (newUserData) {
        dispatch(loginUser(newUserData));
        navigate("/home");
        toast.success("Welcome!");
      }
    }
  }, [allUsers]);

  const onError = (error: any) => {
    toast.error("Please fill all the required fields");
    console.log(error);
  };

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
      dispatch(addEmployee(data));   

  };

  const stepList = [
    {
      authInfo: (
        <div className="flex flex-col gap-2">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">
              Email <span className="text-red-500">*</span>
            </label>
            <Controller
              name="authInfo.email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  className="rounded-md p-2 h-[34px] shadow-gray-300"
                  placeholder="Enter Email"
                />
              )}
            />
            {(errors?.authInfo?.email || getUserExist()) && (
              <p className="text-red-500 text-[12px]">
                {getUserExist()
                  ? "User already exist"
                  : errors?.authInfo?.email?.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">
              Password <span className="text-red-500">*</span>
            </label>
            <Controller
              name="authInfo.password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  value={field.value || undefined}
                  className="rounded-md p-2 h-[34px] shadow-gray-300"
                  placeholder="Enter Password"
                />
              )}
            />
            {errors?.authInfo?.password && (
              <p className="text-red-500 text-[12px]">
                {errors?.authInfo?.password?.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed"
              onClick={() => navigate("/")}
            >
              Login
            </button>

            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed"
              disabled={
                !emailId ||
                !password ||
                !!errors?.authInfo?.password?.message ||
                !!errors?.authInfo?.email?.message ||
                getUserExist()
              }
              onClick={() => setCurrentStep(1)}
            >
              Next
            </button>
          </div>
        </div>
      ),
    },
    {
      basicInfo: (
        <div className="flex flex-col gap-2">
          {/* First Name */}
          <div>
            <label className="text-sm font-bold">
              First Name <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller
              name="basicInfo.firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  className="w-full p-2 border rounded h-8 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter First Name"
                />
              )}
            />
            {errors?.basicInfo?.firstName && (
              <p className="text-red-500 text-[12px]">
                {errors.basicInfo.firstName.message}
              </p>
            )}
          </div>
          {/* Last Name */}
          <div>
            <label className="flex items-center mb-1 gap-1">
              Last Name <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller
              name="basicInfo.lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  className="w-full p-2 border rounded h-8 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter last name"
                />
              )}
            />
            {errors.basicInfo?.lastName && (
              <p className="text-red-500 text-[12px]">
                {errors.basicInfo?.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold">
              Gender <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller
              name="personal.gender"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  field={field}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  placeHolder="Select gender"
                />
              )}
            />
            {errors?.personal?.gender && (
              <p className="text-red-500 text-[12px]">
                {errors.personal.gender.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold">Date of Birth</label>
            <Controller
              name="personal.dob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  type="date"
                  className="w-full p-2 border rounded h-8 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Select date of birth"
                />
              )}
            />
          </div>

          <div className="flex justify-between">
            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed"
              onClick={() => setCurrentStep(0)}
            >
              Back
            </button>

            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed"
              disabled={
                !firstName ||
                !lastName ||
                !gender ||
                !!errors?.basicInfo?.firstName?.message ||
                !!errors?.basicInfo?.lastName?.message ||
                !!errors?.personal?.gender?.message
              }
              onClick={() => setCurrentStep(2)}
            >
              Next
            </button>
          </div>
        </div>
      ),
    },
    {
      personalInfo: (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold">Address</label>
            <Controller
              name="personal.address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  className="w-full p-2 border rounded h-8 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                />
              )}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Mobile No</label>
            <Controller
              name="personal.mobileNo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value || undefined}
                  type="number"
                  className="w-full p-2 border rounded h-8 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter mobile no."
                />
              )}
            />
          </div>

          <div>
            <label className="text-sm font-bold">Marital Status</label>
            <Controller
              name="personal.marriageStatus"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  field={field}
                  options={[
                    { label: "Married", value: "married" },
                    { label: "Unmarried", value: "unmarried" },
                  ]}
                  placeHolder="Select marital status"
                />
              )}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700 disabled:cursor-not-allowed"
              onClick={() => setCurrentStep(1)}
            >
              Back
            </button>

            <button
              className="text-white bg-gradient-to-r from-blue-500 to-blue-600 py-1 px-4 font-semibold rounded-md my-3 hover:from-blue-700 hover:to-blue-700"
              type="submit"
              onClick={handleSubmit(onSubmit, onError)}
            >
              Submit
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative z-10 border min-h-[30rem] w-[20rem] sm:min-w-[26rem] rounded-xl bg-white shadow-md shadow-gray-500 py-20 px-14 bg-opacity-40 backdrop-blur-[1px]">
      <div className="text-2xl font-bold mb-4 text-center"> {"Sign Up"}</div>
      {currentStep === 0 && stepList[currentStep]?.authInfo}
      {currentStep === 1 && stepList[currentStep]?.basicInfo}
      {currentStep === 2 && stepList[currentStep]?.personalInfo}
    </div>
  );
};

export default EmployeeSignup;
