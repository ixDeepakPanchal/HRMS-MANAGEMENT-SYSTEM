import { FiClock, FiSmartphone } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { PiBoundingBoxBold, PiBuildingOfficeBold } from "react-icons/pi";
import { Avatar } from "antd";
import { Employee } from "../types/employeeDataType";
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";

interface prop {
  myInfo?: Employee;
}

function ProfileData({ myInfo }: prop) {
  const reportToInfo = useSelector(
    (state: { auth: { allEmployees: Employee[] } }) => state.auth.allEmployees
  )?.filter(
    (employee: Employee) =>
      employee.authInfo.email === myInfo?.work?.reportingTo
  )[0];

  return (
    <div className="col-span-4 flex flex-wrap  lg:grid lg:grid-cols-4 gap-3 overflow-auto ">
      <div className=" col-span-2 w-full flex flex-col gap-3">
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            About Me{" "}
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" grid grid-cols-2 px-8 py-5 text-sm font-semibold text-gray-700">
            <div className=" flex flex-col  gap-4 ">
              <div className="flex items-center gap-2">
                <MdMiscellaneousServices size={20} />
                <div>{myInfo?.about?.service || "-"}</div>
              </div>
              <div className="flex items-center gap-2">
                <FiSmartphone size={18} />
                <div> {myInfo?.about?.phone || "-"}</div>
              </div>
              <div className="flex items-center gap-2">
                <FiClock size={18} />
                <div>{myInfo?.about?.availability?.to || "-"}</div>
              </div>
            </div>
            <div className=" flex flex-col gap-4 ">
              <div className="flex items-center gap-2">
                <GoPeople size={18} />
                <div>{myInfo?.about?.role || "-"}</div>
              </div>
              <div className="flex items-center gap-2">
                <PiBuildingOfficeBold size={18} />
                <div>{myInfo?.about?.office || "-"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            Organization Structure
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" flex px-8 py-5 text-sm font-semibold text-gray-700 gap-2">
            <PiBoundingBoxBold size={18} />
            <div>
              <div className="text-gray-500">Department</div>
              <div>{myInfo?.work?.department || "-"} </div>
            </div>
          </div>
        </div>
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            Work
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" grid grid-cols-2 px-8 py-5 text-sm font-semibold text-gray-700">
            <div className=" flex flex-col  gap-4 text-gray-500">
              <div className=" ">Department</div>
              <div className="">Reporting To</div>
              <div className=" ">Title</div>
              <div className=" ">Date of Join</div>
            </div>
            <div className=" flex flex-col  gap-4  ">
              <div className=" ">{myInfo?.work?.department || "-"}</div>
              <div className="">{myInfo?.work?.reportingTo || "-"}</div>
              <div className=" ">{myInfo?.work?.title || "-"}</div>
              <div className=" ">{myInfo?.work?.dateofJoin || "-"}</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-span-2 w-full flex flex-col gap-3">
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            Reports To
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" flex px-8 py-5 text-sm font-semibold text-gray-700 gap-3">
            <Avatar
              size={70}
              icon={
                <>
                  {reportToInfo?.profileImages?.myImage ? (
                    <img
                      src={`${reportToInfo?.profileImages.myImage}`}
                      alt="Uploaded"
                      loading="lazy"
                    />
                  ) : (
                    <IoPerson />
                  )}
                </>
              }
            />
            <div className="flex flex-col justify-center">
              <div className="text-gray-500">
                {myInfo?.work?.reportingTo || "-"}
              </div>
              <div>{reportToInfo?.about?.role || "-"} </div>
            </div>
          </div>
        </div>
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            Basic Info
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" grid grid-cols-2 px-8 py-5 text-sm font-semibold text-gray-700">
            <div className="flex flex-col gap-4  text-gray-500">
              <div className=" ">Employee ID</div>
              <div className=" ">First Name</div>
              <div className="">Last Name</div>
              <div className=" ">Email ID</div>
            </div>
            <div className=" flex flex-col gap-4 ">
              <div className=" ">{myInfo?.authInfo?.id || "-"}</div>
              <div className=" ">{myInfo?.basicInfo?.firstName || "-"}</div>
              <div className="">{myInfo?.basicInfo?.lastName || "-"}</div>
              <div className=" ">{myInfo?.authInfo?.email || "-"}</div>
            </div>
          </div>
        </div>
        <div className="border p-4 shadow-sm shadow-gray-200 overflow-hidden">
          <div className="font-bold relative">
            Personal
            <div className="absolute rounded-full size-5 bg-blue-400 top-[3px] left-[-27px]"></div>
          </div>
          <div className=" grid grid-cols-2 px-8 py-5 text-sm font-semibold text-gray-700">
            <div className=" flex flex-col    gap-4  text-gray-500">
              <div className=" ">Mobile No.</div>
              <div className="">Gender</div>
              <div className="">Birth Date</div>
              <div className=" ">Marital Status</div>
              <div className=" ">Address</div>
            </div>
            <div className=" flex flex-col  gap-4 ">
              <div className=" ">{myInfo?.personal?.mobileNo || "-"}</div>
              <div className="">{myInfo?.personal?.gender || "-"}</div>
              <div className="">{myInfo?.personal?.dob || "-"}</div>
              <div className=" ">{myInfo?.personal?.marigeStatus || "-"}</div>
              <div className=" ">{myInfo?.personal?.address || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
