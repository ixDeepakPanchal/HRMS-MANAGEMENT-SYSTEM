import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Employee } from "../types/employeeDataType";
import { useMemo } from "react";
import { IoPerson } from "react-icons/io5";
import { Avatar } from "antd";
import { FaUsers } from "react-icons/fa";

interface prop {
  myInfo: Employee;
  showModal: () => void;
  handleSelectedUser: (rowData: any) => void;
  allEmployees: Employee[];
}

function EmployeeTable({
  myInfo,
  showModal,
  allEmployees,
  handleSelectedUser,
}: prop) {
  const data: any = useMemo(
    () =>
      allEmployees.map((employee: Employee) => {
        return {
          avatar: (
            <Avatar
              className="size-10 rounded-full"
              icon={
                <>
                  {employee.profileImages.myImage ? (
                    <img
                      src={`${employee.profileImages.myImage}`}
                      alt="Uploaded"
                      loading="lazy"
                    />
                  ) : (
                    <IoPerson />
                  )}
                </>
              }
            />
          ),
          id: employee.authInfo?.id || "N/A",
          email: employee.authInfo?.email || "N/A",
          role: employee?.about?.role || "N/A",
          department: employee?.work?.department || "N/A",
          office: employee.about?.office || "N/A",

          delete: employee?.authInfo?.email !== "admin@mail.com" && (
            <button
              className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400  hover:to-red-600 font-semibold rounded-lg shadow-lg "
              onClick={showModal}
            >
              Delete
            </button>
          ),
        };
      }),
    [allEmployees]
  );
  const columns: any = useMemo(
    () => [
      {
        accessorKey: "avatar",
        header: "Avatar",
      },
      {
        accessorKey: "id",
        header: "Employee ID",
      },
      {
        accessorKey: "email",
        header: "Email",
      },

      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "office",
        header: "Location",
      },
      {
        accessorKey: "delete",
        header: "Delete Employee",
      },
    ],

    [allEmployees]
  );
  const table = useMaterialReactTable({
    data: data,
    columns: columns,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleSelectedUser(row),
    }),
    renderTopToolbarCustomActions: () => (
      <h2 className="text-lg font-bold text-gray-600  flex items-center ">
        Employee Details <FaUsers size={24} className="ml-4  text-blue-500" />
      </h2>
    ),
    state: {
      columnVisibility: {
        delete: myInfo.authInfo.email === "admin@mail.com" && true,
      },
    },
  });

  return <MaterialReactTable table={table} />;
}

export default EmployeeTable;