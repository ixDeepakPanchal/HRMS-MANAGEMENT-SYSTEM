import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Employee, LeadReportData } from "../types/employeeDataType";
import { useMemo } from "react";
import { IoPerson } from "react-icons/io5";
import { Avatar } from "antd";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface prop {
  myInfo: Employee;
  showModal: () => void;
  allEmployees: Employee[];
  setEmployeeData: (data: Employee) => void;
}

function EmployeeTable({
  setEmployeeData,
  myInfo,
  showModal,
  allEmployees,
}: prop) {
  const navigate = useNavigate();
  const leadReporters = useSelector(
    (state: { auth: { leadReporters: LeadReportData[] } }) =>
      state.auth.leadReporters
  ).filter((item) => item.email === myInfo?.authInfo?.email);
  const showPerformance = (reportEmail: string) => {
    const show = leadReporters?.[0]?.reportBy?.filter(
      (item) => item === reportEmail
    );
    if (show?.length) {
      return true;
    }
    return false;
  };

  const data: any = useMemo(
    () =>
      allEmployees.map((employee: Employee) => {
        return {
          avatar: (
            <Avatar
              className="size-10 rounded-full"
              icon={
                <>
                  {employee?.profileImages?.myImage ? (
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
          id: employee?.authInfo?.id || "N/A",
          email: employee?.authInfo?.email || "N/A",
          role: employee?.about?.role || "N/A",
          department: employee?.work?.department || "N/A",
          office: employee?.about?.office || "N/A",
          delete: employee?.authInfo?.email !== "admin@mail.com" && (
            <button
              className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400  hover:to-red-600 font-semibold rounded-lg shadow-lg "
              onClick={(e) => {
                e.stopPropagation();
                setEmployeeData(employee);
                showModal();
              }}
            >
              Delete
            </button>
          ),
          performance: (myInfo?.authInfo?.email === "admin@mail.com" ||
            showPerformance(employee?.authInfo?.email)) &&
            employee.authInfo.email !== "admin@mail.com" && (
              <button
                className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400  hover:to-blue-600 font-semibold rounded-lg shadow-lg "
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/employees/${employee?.authInfo?.email}/performance`);
                }}
              >
                Performance
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
        accessorKey: "performance",
        header: "Performance",
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
      onClick: () => navigate(`/employees/${row.original.email}`),
    }),
    renderTopToolbarCustomActions: () => (
      <h2 className="text-lg font-bold text-gray-600  flex items-center ">
        Employee Details <FaUsers size={24} className="ml-4  text-blue-500" />
      </h2>
    ),
    state: {
      columnVisibility: {
        delete: myInfo.authInfo.email === "admin@mail.com",
        performance: leadReporters?.length ? true : false,
      },
    },
  });

  return <MaterialReactTable table={table} />;
}

export default EmployeeTable;
