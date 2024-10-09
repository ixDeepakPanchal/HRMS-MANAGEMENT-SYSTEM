import { useForm, Controller } from "react-hook-form";
import { Employee } from "../types/employeeDataType";
import { Collapse, CollapseProps, FloatButton } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, editProfile } from "../../store/AuthSlice";
import { schema } from "../schema/employeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface prop {
  setBackButton: (data: string | undefined) => void;
  editData?: Employee | undefined;
}

const AddEmployeeForm = ({ setBackButton, editData }: prop) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    resolver: zodResolver(schema),
    defaultValues: {
      authInfo: { id: "", email: "", password: "" },
      about: {
        role: "",
        service: "",
        phone: "",
        availability: { from: "", to: "" },
        office: "",
      },

      basicInfo: {
        firstName: "",
        lastName: "",
      },
      work: {
        department: "",
        reportingTo: "",

        title: "",
        dateofJoin: "",
      },
      personal: {
        mobileNo: undefined,
        dob: "",
        gender: "",
        otherMail: "",
        marigeStatus: "",
        address: "",
      },

      profileImages: {},
    },
  });

  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData]);

  const onSubmit = (data: Employee) => {
    console.log(data);
    if (editData) {
      dispatch(editProfile(data));
    } else {
      dispatch(addEmployee(data));
    }
    setBackButton(undefined);
    reset();
  };

  const handleBackToDetail = () => {
    setBackButton(undefined);
  };

  const formItems: CollapseProps["items"] = [
    {
      key: 1,
      label: (
        <p className="text-lg text-gray-600 font-semibold ">
          Authentication Info
        </p>
      ),

      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-2 gap-1 items-center ">
                Employee ID <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.id"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <input
                      disabled={
                        !!editData && myInfo.authInfo.email !== "admin@mail.com"
                      }
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.authInfo?.id && (
                      <p className="text-red-500 text-[12px]">
                        {errors.authInfo?.id.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2">
                Employee Email{"  "}
                <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.email"
                render={({ field }) => (
                  <div>
                    <input
                      disabled={
                        !!editData && myInfo.authInfo.email !== "admin@mail.com"
                      }
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.authInfo?.email && (
                      <p className="text-red-500 text-[12px]">
                        {errors.authInfo?.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2">
                Password
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("authInfo.password")}
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.authInfo?.password && (
                <p className="text-red-500 text-[12px]">
                  {errors.authInfo?.password.message}
                </p>
              )}
            </div>
          </div>
        </section>
      ),
    },
    {
      key: 2,
      label: <p className="text-lg text-gray-600 font-semibold ">About</p>,
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-2 gap-1  items-center">
                Role <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("about.role")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.about?.role && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.role.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex gap-1 items-center mb-2">
                Service
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("about.service")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.about?.service && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.service.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-2">Phone</label>
              <input
                {...register("about.phone")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.about?.phone && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-2">
                Availability From
              </label>
              <Controller
                control={control}
                name="about.availability.from"
                render={({ field }) => (
                  <input
                    disabled={
                      !!editData && myInfo.authInfo.email !== "admin@mail.com"
                    }
                    {...field}
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
            </div>
            <div>
              <label className="flex items-center mb-2">Availability To</label>
              <Controller
                control={control}
                name="about.availability.to"
                render={({ field }) => (
                  <input
                    disabled={
                      !!editData && myInfo.authInfo.email !== "admin@mail.com"
                    }
                    {...field}
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
            </div>
            <div>
              <label className="flex gap-1 items-center mb-2">
                Office Location
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("about.office")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.about?.office && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.office.message}
                </p>
              )}
            </div>
          </div>
        </section>
      ),
    },
    {
      key: 3,
      label: (
        <p className="text-lg text-gray-600 font-semibold ">
          Basic Information
        </p>
      ),
      children: (
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-2 gap-1 items-center ">
                Employee ID <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.id"
                render={({ field }) => (
                  <input
                    disabled={true}
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
            </div>
            <div>
              <label className="flex items-center mb-2 gap-1">
                First Name <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                {...register("basicInfo.firstName")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.basicInfo?.firstName && (
                <p className="text-red-500 text-[12px]">
                  {errors.basicInfo?.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-2 gap-1">
                Last Name <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                {...register("basicInfo.lastName")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.basicInfo?.lastName && (
                <p className="text-red-500 text-[12px]">
                  {errors.basicInfo?.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-2 gap-1">
                Email<span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.email"
                render={({ field }) => (
                  <input
                    disabled={true}
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              />
            </div>
          </div>
        </section>
      ),
    },
    {
      key: 4,
      label: (
        <p className="text-lg text-gray-600 font-semibold ">Work Details</p>
      ),
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 mb-2">
                Department
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("work.department")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.work?.department && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.department.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2">
                Reporting To
                <span className="text-red-600 font-bold">*</span>
              </label>
              <select
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("work.reportingTo")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {allEmployees.map((employeeData: Employee, index: number) => (
                  <option key={index} value={`${employeeData.authInfo.email}`}>
                    {employeeData.authInfo.email}
                  </option>
                ))}
              </select>
              {errors.work?.reportingTo && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.reportingTo.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2">
                Title
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("work.title")}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.work?.title && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-2">
                Date of Joining
              </label>
              <input
                disabled={
                  !!editData && myInfo.authInfo.email !== "admin@mail.com"
                }
                {...register("work.dateofJoin")}
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </section>
      ),
    },
    {
      key: 5,
      label: (
        <p className="text-lg text-gray-600 font-semibold ">
          Personal Information
        </p>
      ),
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center mb-2">Mobile No </label>
              <input
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("personal.mobileNo")}
                type="tel"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="flex items-center mb-2">Date of Birth </label>
              <input
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("personal.dob")}
                type="date"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="flex items-center mb-2 gap-1">
                Gender <span className="text-red-600 font-bold">*</span>
              </label>
              <select
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("personal.gender")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.personal?.gender && (
                <p className="text-red-500 text-[12px]">
                  {errors.personal?.gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-2">Address </label>
              <input
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("personal.address")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="flex items-center mb-2">Marital Status </label>
              <select
                disabled={
                  !!editData &&
                  editData.authInfo.email !== myInfo.authInfo.email
                }
                {...register("personal.marigeStatus")}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="marid">Maried</option>
                <option value="unmarid">Unmaried</option>
              </select>
            </div>
          </div>
        </section>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 h-full overflow-auto p-5">
      <div className="bg-white  rounded-lg shadow-md max-w-3xl mx-auto p-6 relative">
        <FloatButton
          tooltip={<p>back to {!!editData ? "Profile" : "Dashboard"}</p>}
          className="absolute top-[1vh] left-[1vw] size-8"
          icon={<IoMdArrowRoundBack className=" text-white" />}
          onClick={handleBackToDetail}
          type="primary"
        />
        <h2 className="text-2xl font-bold mb-4 text-center">
          {!!editData ? "Edit" : "Add"} Employee Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Collapse
            defaultActiveKey={!!editData ? [1, 2, 3, 4, 5] : 1}
            items={formItems}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
