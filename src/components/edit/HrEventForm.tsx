import { useForm } from "react-hook-form";
import { hrEventsType, TodayEventsType } from "../types/employeeDataType";
import { FloatButton } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addHrEvent, addTodayEvent } from "../../store/AuthSlice";
interface prop {
  setBackButton: (data: string | undefined) => void;
  selectedForm?: string;
}

const HrEventForm = ({ setBackButton, selectedForm }: prop) => {
  const { register, handleSubmit, reset } = useForm<
    hrEventsType | TodayEventsType
  >();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackToDetail = () => {
    setBackButton(undefined);
  };
  const onsubmit = (data: hrEventsType | TodayEventsType) => {
    if (!!selectedForm) {
      dispatch(addTodayEvent(data));
    } else {
      dispatch(addHrEvent(data));
    }
    reset();
    navigate("/home/plans");
  };

  return (
    <div
      className={`h-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 overflow-auto`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <FloatButton
          tooltip={<p>back to Dashboard</p>}
          className="absolute top-[1vh] left-[1vw] size-8"
          icon={<IoMdArrowRoundBack className=" text-white" />}
          onClick={handleBackToDetail}
          type="primary"
        />
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {!!selectedForm ? "Today's" : "Upcoming"} Event
        </h3>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Event Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter event title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Event Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter event description"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          {!!selectedForm ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  {...register("time.start", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  {...register("time.end", { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Event Date
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
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
