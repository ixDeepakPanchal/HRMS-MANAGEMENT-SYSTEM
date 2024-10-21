import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Employee, PerformaceType } from "../types/employeeDataType";
import SearchSelect from "../search/SearchSelect";
import { addPerformance } from "../../store/AuthSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { performanceSchema } from "../schema/performanceSchema";
import { useNavigate, useParams } from "react-router-dom";

function PerformanceReport() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<PerformaceType>({
    mode: "all",
    resolver: zodResolver(performanceSchema),
  });
  const dispatch = useDispatch();

  const myPerformance = useSelector(
    (state: { auth: { employeePerformance: PerformaceType[] } }) =>
      state.auth.employeePerformance
  );

  useEffect(() => {
    if (!!id) {
      const performance = myPerformance.filter((item) => item.email === id);
      reset(performance[0]);
    }
  }, [id]);

  const allEmployees = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  ).filter(
    (employeeData: Employee) => employeeData.authInfo.email !== "admin@mail.com"
  );

  const options = allEmployees?.map((employeeData: Employee) => ({
    value: employeeData.authInfo.email,
    label: employeeData.authInfo.email,
  }));

  const rateOption = [
    { label: "Excellent", value: "100" },
    { label: "Good", value: "80" },
    { label: "Average", value: "60" },
    { label: "Fair", value: "40" },
    { label: "Poor", value: "20" },
  ];

  const onsubmit = (data: PerformaceType) => {

    try {
      dispatch(addPerformance({ ...data }));
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Performance Update Successfully");
      navigate("/employees/deepak@mail.com/performance")
      reset();
    }
  };

  return (
    <div className="h-full mx-auto p-8 bg-white shadow-md rounded-lg space-y-6 overflow-auto">
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* Main Heading */}
        <h2 className="text-2xl font-bold mb-6  text-center">
          <span className="border py-2 px-4 rounded-lg bg-blue-500 text-white">
            Employee Progress Report
          </span>
        </h2>

        {/* Employee Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Employee Email<span className="text-red-600 font-bold">*</span>
            </label>
            <Controller
              name="email"
              defaultValue={id}
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={options}
                    placeHolder="Select employee..."
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-[12px]">
                      {errors.email.message}
                    </p>
                  )}</>
              )}
            />
          </div>
        </div>

        {/* Performance Metrics Heading */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Performance Metrics</h3>

        {/* Performance Metrics Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Task Completion <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller

              name="taskCompletion"
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={rateOption}
                    placeHolder="Select Performance"
                  />{errors?.taskCompletion && (
                    <p className="text-red-500 text-[12px]">
                      {errors.taskCompletion.message}
                    </p>
                  )}</>
              )}
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-base font-semibold  text-gray-600 mb-2 flex gap-1">
              Quality of Work <span className="text-red-600 font-bold">*</span>
            </label>

            <Controller

              name="workQuality"
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={rateOption}
                    placeHolder="Select Performance"
                  />
                  {errors?.workQuality && (
                    <p className="text-red-500 text-[12px]">
                      {errors.workQuality.message}
                    </p>
                  )}</>
              )}
            />
          </div>
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Time puntuality <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller

              name="attandanceReview"
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={rateOption}
                    placeHolder="Select Performance"
                  />
                  {errors?.attandanceReview && (
                    <p className="text-red-500 text-[12px]">
                      {errors.attandanceReview.message}
                    </p>
                  )}</>
              )}
            />
          </div>
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Work Efficiency <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller

              name="workEfficiency"
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={rateOption}
                    placeHolder="Select Performance"
                  />
                  {errors?.workEfficiency && (
                    <p className="text-red-500 text-[12px]">
                      {errors.workEfficiency.message}
                    </p>
                  )}</>
              )}
            />
          </div>
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Adherence Of Work{" "}
              <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller

              name="adherenceOfWork"
              control={control}
              render={({ field }) => (
                <>
                  <SearchSelect
                    field={field}
                    options={rateOption}
                    placeHolder="Select Performance"
                  />
                  {errors?.adherenceOfWork && (
                    <p className="text-red-500 text-[12px]">
                      {errors.adherenceOfWork.message}
                    </p>
                  )}</>
              )}
            />
          </div>
        </div>

        {/* Feedback Section */}
        <h3 className="text-lg font-semibold mt-6 mb-4">Feedback </h3>
        <textarea
          className="border rounded w-full p-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Add feedback here"
          {...register("feedback")}
        />

        {/* Admin Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2">
              Overall Rating <span className="text-red-600 font-bold">*</span>
            </label>
            <Controller
              rules={{ required: true }}
              name="overallPerformance"
              control={control}
              defaultValue={5}
              render={({ field }) => (
                <Slider
                  {...field}
                  max={5}
                  tooltip={{ open: true, placement: "bottom" }}
                />
              )}
            />
          </div> 
          <div>
            <label className="flex gap-1 text-base font-semibold  text-gray-600 mb-2 ">
              Date of Review 
              <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              className="border rounded h-8 w-full px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              type="date"
              {...register("date")}
            />
          </div>*/}
        </div>

        <button className="bg-blue-500 text-white rounded p-3 mt-6">
          Submit Progress Report
        </button>
      </form>
    </div>
  );
}

export default PerformanceReport;
