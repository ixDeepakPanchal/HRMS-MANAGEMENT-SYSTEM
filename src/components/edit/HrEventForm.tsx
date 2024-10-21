import { useForm } from "react-hook-form";
import { hrEventsType, TodayEventsType } from "../types/employeeDataType";
import { FloatButton } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHrEvent, addTodayEvent } from "../../store/AuthSlice";
import { useEffect } from "react";


const HrEventForm = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<
    hrEventsType | TodayEventsType
  >();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const todayDate = new Date();
    setValue("date", `${todayDate.getDate()}-${todayDate.getMonth() + 1}-${todayDate.getFullYear()}`);
  }, [setValue]);

  const onsubmit = (data: hrEventsType | TodayEventsType) => {
    if (location.pathname === "/home/addEvent") {
      dispatch(addTodayEvent(data));
    } else {
      dispatch(addHrEvent(data));
    }
    reset();
    navigate("/home");
  };

  return (
    <div
      className={`p-5 h-full grid grid-cols-1 justify-items-center bg-gradient-to-r from-purple-400 to-pink-500 overflow-auto`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative  h-full">
        <FloatButton
          tooltip={<p>back to Dashboard</p>}
          className="absolute top-[1vh] left-[1vw] size-8"
          icon={<IoMdArrowRoundBack className=" text-white" />}
          onClick={() => navigate("/home")}
          type="primary"
        />
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {!!(location.pathname === "/home/addEvent") ? "Today's" : "Upcoming"}{" "}
          Event
        </h3>

        <form onSubmit={handleSubmit(onsubmit)} >
          <div className="mb-4">
            <label className="flex gap-1 text-gray-700 font-medium mb-2">
              Event Title <span className="text-red-600 font-bold">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Please enter title" })}
              placeholder="Enter event title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors?.title && (
              <p className="text-red-500 text-[12px]">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex gap-1 text-gray-700 font-medium mb-2">
              Event Description
              <span className="text-red-600 font-bold">*</span>

            </label>
            <textarea
              {...register("description", { required: "Enter event description" })}
              placeholder="Enter event description"
              className="w-full p-2 border border-gray-300 rounded-md"

            />
            {errors?.description && (
              <p className="text-red-500 text-[12px]">
                {errors.description.message}
              </p>
            )}
          </div>
          {!!(location.pathname === "/home/addEvent") ? (
            <>
              <div className="mb-4">
                <label className="flex gap-1 text-gray-700 font-medium mb-2">
                  Start Time<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="time"
                  {...register("time.start", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />

              </div>

              <div className="mb-4">
                <label className="flex gap-1 text-gray-700 font-medium mb-2">
                  End Time<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="time"
                  {...register("time.end", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="flex gap-1 text-gray-700 font-medium mb-2">
                  Event Date<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  {...register("date")}
                  disabled
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="flex gap-1 text-gray-700 font-medium mb-2">
                Event Date<span className="text-red-600 font-bold">*</span>
              </label>
              <input
                type="date"
                {...register("date", { required: "Select Event date" })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors?.date && (
                <p className="text-red-500 text-[12px]">
                  {errors?.date.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default HrEventForm;
