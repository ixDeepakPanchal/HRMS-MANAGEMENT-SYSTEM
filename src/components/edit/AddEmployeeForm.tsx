import { useForm, Controller } from "react-hook-form";
import { Employee } from "../types/employeeDataType";
import { Collapse, CollapseProps, FloatButton, Input } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdError } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, editProfile } from "../../store/AuthSlice";
import { employeeSchema } from "../schema/employeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SearchSelect from "../search/SearchSelect";



const AddEmployeeForm = () => {
  let { id } = useParams();
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    mode: "all",
    resolver: zodResolver(employeeSchema),

  });
  const [editId, setEditId] = useState<string>();
  const [errorKey, setErrorKey] = useState<number[]>([])
  const navigate = useNavigate();
  const myInfo = useSelector(
    (state: { auth: { authUser: Employee } }) => state.auth.authUser
  );

  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!id) {
      const editUser = allEmployees.filter(
        (employee) => employee?.authInfo?.email === id
      );

      reset(editUser[0]);
    } else if (!!state?.id) {
      id = state?.id;
      const editUser = allEmployees.filter(
        (employee) => employee?.authInfo?.email === id
      );
      reset(editUser[0]);

    }

    setEditId(() => id)
  }, [allEmployees]);



  useEffect(() => {
    const errorSections: number[] = [];
    setErrorKey(() => []);
    if (errors.authInfo) errorSections.push(1);
    if (errors.about) errorSections.push(2);
    if (errors.basicInfo) errorSections.push(3);
    if (errors.work) errorSections.push(4);
    if (errors.personal) errorSections.push(5);
    setErrorKey(() => errorSections)
  }, [errors]);


  const departmentOption = [{ label: "MOEI", value: "MOEI" }, { label: "DOE", value: "DOE" }, { label: "DMS", value: "DMS" }, { label: "INTERN", value: "INTERN" }, { label: "MANAGEMANT", value: "MANAGEMANT" }]

  const onSubmit = (data: Employee) => {

    if (editId) {
      toast.success("Profile Updated Successfully !");
      dispatch(editProfile(data));
      if (!!state?.id) {
        return navigate("/myprofile")
      }
      return navigate(`/employees/${id}`);

    } else if (allEmployees.filter(item => item.authInfo.email === data.authInfo.email).length) {
      return toast.error("Employee already exist !")
    } else {
      dispatch(addEmployee(data));
    }
    toast.success("User Created Successfully !");
    navigate("/home")
    reset();
  };

  const formItems: CollapseProps["items"] = [
    {
      key: 1,
      label: (
        <p className={`text-lg text-gray-600 font-semibold ${errorKey.includes(1) && "text-orange-600"} flex items-center gap-1`}>
          Authentication Info {errorKey.includes(1) && <MdError size={20} className="text-orange-600" />}
        </p>
      ),

      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-1 gap-1 items-center ">
                Employee ID <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.id"
                render={({ field }) => (
                  <div className="flex flex-col">
                    <input
                      disabled={
                        !!editId || myInfo.authInfo.email !== "admin@mail.com"
                      }
                      {...field}
                      value={field.value || ""}
                      className="w-full  p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Enter employee ID"
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
              <label className="flex items-center gap-1 mb-1">
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
                        !!editId || myInfo.authInfo.email !== "admin@mail.com"
                      }
                      {...field}
                      value={field.value || ""}
                      className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
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
              <label className="flex items-center gap-1 mb-1">
                Password
                <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller name="authInfo.password" control={control} render={({ field }) => <Input.Password {...field}
                disabled={!!editId && editId !== myInfo.authInfo.email}
                placeholder="Enter Password" />} />

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
      label: <p className={`text-lg text-gray-600 font-semibold ${errorKey.includes(2) && "text-orange-600"} flex items-center gap-1`}>About {errorKey.includes(2) && <MdError size={20} className="text-orange-600" />}</p>,
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-1 gap-1  items-center">
                Role <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="text"
                disabled={!!editId && myInfo.authInfo.email !== "admin@mail.com"}
                {...register("about.role")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter employee role"
              />
              {errors.about?.role && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.role.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex gap-1 items-center mb-1">
                Service
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={!!editId && myInfo.authInfo.email !== "admin@mail.com"}
                type="text"
                {...register("about.service")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter employee service"
              />
              {errors.about?.service && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.service.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-1">Phone</label>
              <input
                type="number"
                {...register("about.phone")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter employee phone no."
              />
              {errors.about?.phone && (
                <p className="text-red-500 text-[12px]">
                  {errors.about?.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex gap-1 items-center mb-1">
                Office Location
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={!!editId && myInfo.authInfo.email !== "admin@mail.com"}
                {...register("about.office")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter office"
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
        <p className={`text-lg text-gray-600 font-semibold ${errorKey.includes(3) && "text-orange-600"} flex items-center gap-1`}>
          Basic Information {errorKey.includes(3) && <MdError size={20} className="text-orange-600" />}
        </p>
      ),
      children: (
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex mb-1 gap-1 items-center ">
                Employee ID <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.id"
                render={({ field }) => (
                  <input
                    disabled={true}
                    {...field}
                    value={field.value || ""}
                    className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
            </div>
            <div>
              <label className="flex items-center mb-1 gap-1">
                First Name <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                {...register("basicInfo.firstName")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
              {errors.basicInfo?.firstName && (
                <p className="text-red-500 text-[12px]">
                  {errors.basicInfo?.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-1 gap-1">
                Last Name <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                {...register("basicInfo.lastName")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter last name"
              />
              {errors.basicInfo?.lastName && (
                <p className="text-red-500 text-[12px]">
                  {errors.basicInfo?.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-1 gap-1">
                Email<span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="authInfo.email"
                render={({ field }) => (
                  <input
                    disabled={true}
                    {...field}
                    value={field.value || ""}
                    className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        <p className={`text-lg text-gray-600 font-semibold ${errorKey.includes(4) && "text-orange-600"} flex items-center gap-1`}>Work Details {errorKey.includes(4) && <MdError size={20} className="text-orange-600" />}</p>
      ),
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 mb-1">
                Department
                <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="work.department"
                render={({ field }) => <SearchSelect field={field} options={departmentOption} disable={!!editId && myInfo.authInfo.email !== "admin@mail.com"} placeHolder="Select department" />} />
              {errors.work?.department && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.department.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-1">
                Reporting To
                <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="work.reportingTo"
                render={({ field }) => <SearchSelect field={field} options={allEmployees.map((employeeData: Employee) => {
                  return { label: employeeData.authInfo.email, value: employeeData.authInfo.email }
                })} disable={!!editId && myInfo.authInfo.email !== "admin@mail.com"} placeHolder="Select lead" />} />

              {errors.work?.reportingTo && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.reportingTo.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-1">
                Job Title
                <span className="text-red-600 font-bold">*</span>
              </label>
              <input
                disabled={!!editId && myInfo.authInfo.email !== "admin@mail.com"}
                {...register("work.title")}
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter job title"
              />
              {errors.work?.title && (
                <p className="text-red-500 text-[12px]">
                  {errors.work?.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1 mb-1">
                Date of Joining
              </label>
              <input
                disabled={!!editId && myInfo.authInfo.email !== "admin@mail.com"}
                {...register("work.dateofJoin")}
                type="date"
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select date of joining"
              />
            </div>
          </div>
        </section>
      ),
    },
    {
      key: 5,
      label: (
        <p className={`text-lg text-gray-600 font-semibold ${errorKey.includes(5) && "text-orange-600"} flex items-center gap-1`}>
          Personal Information {errorKey.includes(5) && <MdError size={20} className="text-orange-600" />}
        </p>
      ),
      children: (
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center mb-1">Mobile No </label>
              <input
                disabled={!!editId && editId !== myInfo.authInfo.email}
                {...register("personal.mobileNo")}
                type="number"
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter mobile no."
              />
            </div>
            <div>
              <label className="flex items-center mb-1">Date of Birth </label>
              <input
                disabled={!!editId && editId !== myInfo.authInfo.email}
                {...register("personal.dob")}
                type="date"
                className="w-full p-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select date of birth"
              />
            </div>
            <div>
              <label className="flex items-center mb-1 gap-1">
                Gender <span className="text-red-600 font-bold">*</span>
              </label>
              <Controller
                control={control}
                name="personal.gender"
                render={({ field }) => <SearchSelect field={field} options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }, { label: "Other", value: "other" }]} disable={!!editId && editId !== myInfo.authInfo.email} placeHolder="Select gender" />} />

              {errors.personal?.gender && (
                <p className="text-red-500 text-[12px]">
                  {errors.personal?.gender.message}
                </p>
              )}
            </div>
            <div>
              <label className="flex items-center mb-1">Address </label>
              <input
                disabled={!!editId && editId !== myInfo.authInfo.email}
                {...register("personal.address")}
                className="w-full px-2 border border-gray-300 rounded h-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address "
              />
            </div>
            <div>
              <label className="flex items-center mb-1">Marital Status </label>

              <Controller
                control={control}
                name="personal.marriageStatus"
                render={({ field }) => <SearchSelect field={field} options={[{ label: "Married", value: "married" }, { label: "Unmarried", value: "unmarried" }]} disable={!!editId && editId !== myInfo.authInfo.email} placeHolder="Select maarritle status" />} />

            </div>
          </div>
        </section>
      ),
    },
  ];

  const onError =(err:any)=>{
    console.log(err)

  }

  return (
    <div className="bg-gray-50 h-full overflow-auto p-5">
      <div className="bg-white  rounded-lg shadow-md max-w-3xl mx-auto p-6 relative">
        <FloatButton
          tooltip={<p>back to {!!editId ? "Profile" : "Dashboard"}</p>}
          className="absolute top-[1vh] left-[1vw] size-8"
          icon={<IoMdArrowRoundBack className=" text-white" />}
          onClick={() => {
            if (!!state?.id) {
              navigate("/myprofile");
            } else if (!!id) {
              navigate(`/employees/${id}`);
            } else {
              navigate(`/home`);
            }
          }}
          type="primary"
        />
        <h2 className="text-2xl font-bold mb-4 text-center">
          {!!editId ? "Edit" : "Add"} Employee Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit,onError)}>
          <Collapse

            defaultActiveKey={!!id ? [1, 2, 3, 4, 5] : 1}
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
