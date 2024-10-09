import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useDispatch } from "react-redux";
import { Employee, LeaveData } from "../types/employeeDataType";

import { ChangeEvent, useMemo } from "react";
import { setLeaveStatus } from "../../store/AuthSlice";
import { Avatar } from "antd";
import { IoPerson } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";

interface prop {
  leaveData: LeaveData[];

  myInfo: Employee;
  allEmployees: Employee[];
}

function LeaveTable({ leaveData, myInfo, allEmployees }: prop) {
  const dispatch = useDispatch();

  const handleOnChange = (
    index: number,
    e: ChangeEvent<HTMLSelectElement>,
    leave: LeaveData
  ) => {
    dispatch(
      setLeaveStatus({
        index: index,
        data: { ...leave, status: e.target.value },
      })
    );
  };

  const handleUserImage = (leaveMail: string | undefined) => {
    const user = allEmployees.filter(
      (employee: Employee) => leaveMail === employee.authInfo.email
    )[0];

    if (user.profileImages.myImage) {
      return (
        <img
          src={`${user.profileImages.myImage}`}
          alt="Uploaded"
          loading="lazy"
        />
      );
    }
    return <IoPerson />;
  };

  const data: any = useMemo(
    () =>
      leaveData
        ?.map((leave: LeaveData, index: number) => {
          if (
            leave.email === myInfo.authInfo.email ||
            myInfo.authInfo.email === "admin@mail.com"
          ) {
            return {
              id: leave.id,
              email: leave.email,
              type: leave.type,
              date: leave.date,
              status: (
                <span
                  className={`p-2 bg-gradient-to-r ${
                    leave.status === "pending"
                      ? "from-orange-500 to-orange-600   hover:from-orange-600 hover:to-orange-700"
                      : leave.status === "approved"
                      ? "from-green-500 to-green-600   hover:from-green-600 hover:to-green-700"
                      : "from-red-500 to-red-600  hover:from-red-600 hover:to-red-700"
                  }  text-white font-semibold rounded-lg shadow-lg `}
                >
                  {leave.status}
                </span>
              ),
              setStatus: (
                <select
                  className={`p-2 bg-gradient-to-r ${
                    leave.status === "pending"
                      ? "from-orange-500 to-orange-600 focus:ring-orange-400  hover:from-orange-600 hover:to-orange-700"
                      : leave.status === "approved"
                      ? "from-green-500 to-green-600 focus:ring-green-400  hover:from-green-600 hover:to-green-700"
                      : "from-red-500 to-red-600 focus:ring-red-400  hover:from-red-600 hover:to-red-700"
                  }  text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out`}
                  defaultValue={leave.status}
                  onChange={(e) => handleOnChange(index, e, leave)}
                >
                  <option
                    hidden={leave.status === "denied"}
                    className="text-gray-800 font-bold"
                    value="approved"
                  >
                    approved
                  </option>
                  <option
                    hidden
                    className="text-gray-800 font-bold"
                    value="pending"
                  >
                    pending
                  </option>
                  <option className="text-gray-800 font-bold" value="denied">
                    denied
                  </option>
                </select>
              ),
              avatar: (
                <Avatar
                  className="size-10 rounded-full"
                  icon={<>{handleUserImage(leave.email)}</>}
                />
              ),
            };
          } else return undefined;
        })
        .filter((item) => item),
    [leaveData]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "avatar",
        header: "Avatar",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "id",
        header: "Employee ID",
      },
      {
        accessorKey: "type",
        header: "Leave Type",
      },
      {
        accessorKey: "date",
        header: "Leave Date",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "setStatus",
        header: "Set Status",
      },
    ],

    [myInfo]
  );

  const table = useMaterialReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        setStatus: myInfo.authInfo.email === "admin@mail.com" ? true : false,
      },
    },
    initialState: {},
    renderTopToolbarCustomActions: () => (
      <h2 className="text-lg font-bold text-gray-600  flex items-center ">
        {myInfo.authInfo.email === "admin@mail.com" ? "Employee" : "My"} Leave{" "}
        <FaTasks size={24} className="ml-4  text-blue-500" />
      </h2>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default LeaveTable;
