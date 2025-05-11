import { createSlice } from "@reduxjs/toolkit";
import { customData } from "./data";
import { v4 as uuidv4 } from "uuid";
import {
  AttendanceType,
  Employee,
  hrEventsType,
  LeadReportData,
  LeaveData,
  PerformaceType,
  TaskDataType,
  TodayEventsType,
} from "../components/types/employeeDataType";

type InitialDataType = {
  employeeFeeback: { email: string; date: Date }[];
  leadReporters: LeadReportData[];
  employeePerformance: PerformaceType[];
  attendanceList: AttendanceType[];
  todayEvents: TodayEventsType[];
  hrEvents: hrEventsType[];
  taskData: TaskDataType[];
  leaveData: LeaveData[];
  searchData: string | undefined;
  authUser: null | Employee;
  allEmployees: Employee[];
};

const initialState: InitialDataType = {
  employeeFeeback: [],
  leadReporters: [
    {
      email: "admin@mail.com",
      reportBy: ["admin@mail.com", "deepak@mail.com"],
    },
    {
      email: "deepak@mail.com",
      reportBy: ["deepak@mail.com"],
    },
  ],
  employeePerformance: [],
  attendanceList: [],
  todayEvents: [],
  hrEvents: [],
  taskData: [],
  leaveData: [],
  searchData: undefined,
  authUser: null,
  allEmployees: customData,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    loginUser: (state, actions) => {
      state.authUser = actions.payload;
    },
    logoutUser: (state) => {
      state.authUser = null;
    },
    addEmployee: (state, actions: { payload: Employee }) => {
      actions.payload.authInfo.id = `Emp-${uuidv4().slice(0, 6)}`;
      const newLeadReportsData = state.leadReporters.map((item) => {
        if (
          item?.email === actions?.payload?.work?.reportingTo &&
          actions?.payload?.work?.reportingTo !== "admin@mail.com"
        ) {
          item.reportBy.push(actions?.payload?.authInfo?.email);
        }
        if (item.email === "admin@mail.com") {
          item.reportBy.push(actions?.payload?.authInfo?.email);
        }
        return item;
      });
      const existLead = newLeadReportsData.filter(
        (item) => item?.email === actions?.payload?.work?.reportingTo
      ).length;
      if (existLead) {
        state.leadReporters = newLeadReportsData;
      } else {
        state.leadReporters.push({
          email: actions?.payload?.work?.reportingTo,
          reportBy: [actions?.payload?.authInfo?.email],
        });
      }
      state.leadReporters.push({
        email: actions?.payload?.authInfo.email,
        reportBy: [actions?.payload?.authInfo.email],
      });

      state.allEmployees.push(actions.payload);
    },
    deleteEmployee: (state, actions: { payload: Employee }) => {
      let newLeadReportsData = state.leadReporters.filter(
        (item) => item.email !== actions.payload.authInfo.email
      );

      newLeadReportsData = newLeadReportsData.map((item) => {
        const newReportBy = item.reportBy.filter(
          (email) => email !== actions.payload.authInfo.email
        );
        item.reportBy = newReportBy;
        return item;
      });

      state.leadReporters = newLeadReportsData;
      state.allEmployees = state.allEmployees.filter(
        (employee: Employee) =>
          employee.authInfo.email !== actions.payload.authInfo.email
      );
    },
    setSearch: (state, actions) => {
      state.searchData = actions.payload;
    },
    addHrEvent: (state, actions) => {
      state.hrEvents.push(actions.payload);
    },
    addTodayEvent: (state, actions) => {
      state.todayEvents.push(actions.payload);
    },
    addTask: (state, actions) => {
      state.taskData.push({
        taskId: state.taskData.length,
        ...actions.payload,
      });
    },
    addLeave: (state, actions) => {
      state.leaveData.unshift(actions.payload);
    },
    addAttendance: (state, actions) => {
      state.attendanceList.push(actions.payload);
    },
    updateAttendance: (state, actions) => {
      state.attendanceList = state.attendanceList.map((item) =>
        item.id === actions.payload.id && item.date === actions.payload.date
          ? { checkIn: item.checkIn, ...actions.payload }
          : item
      );
    },
    editProfile: (state, actions) => {
      let newLeadReportsData = state.leadReporters.map((item) => {
        if (item.email !== "admin@mail.com") {
          const newReportBy = item.reportBy.filter(
            (email) => email !== actions.payload.authInfo.email
          );
          item.reportBy = newReportBy;
        }
        return item;
      });

      state.leadReporters = newLeadReportsData.map((item) => {
        if (
          item.email === actions?.payload?.work?.reportingTo &&
          (actions?.payload?.work?.reportingTo !== "admin@mail.com" ||
            item.email !== actions?.payload?.authInfo?.email)
        ) {
          item.reportBy.push(actions?.payload?.authInfo?.email);
        }
        return item;
      });

      state.allEmployees = state.allEmployees.map((employeee: Employee) =>
        employeee.authInfo.email === actions.payload?.authInfo.email
          ? actions.payload
          : employeee
      );
    },
    setTaskStatus: (state, actions) => {
      state.taskData.splice(actions.payload.taskId, 1, actions.payload.data);
    },
    setLeaveStatus: (state, actions) => {
      state.leaveData.splice(actions.payload.index, 1, actions.payload.data);
    },
    editImage: (state, actions) => {
      if (actions.payload.type === "CHANGE_MY_IMAGE") {
        if (state.authUser) {
          state.authUser.profileImages.myImage = actions.payload.data;
          state.allEmployees = state.allEmployees.map((employeee: Employee) =>
            employeee.authInfo.email === state.authUser?.authInfo.email
              ? state.authUser
              : employeee
          );
        }
      } else if (actions.payload.type === "REMOVE_MY_IMAGE") {
        if (state.authUser) {
          state.authUser.profileImages.myImage = undefined;
          state.allEmployees = state.allEmployees.map((employeee: Employee) =>
            employeee.authInfo.email === state.authUser?.authInfo.email
              ? state.authUser
              : employeee
          );
        }
      }
    },
    addPerformance: (state, actions) => {
      const newPerformance = state.employeePerformance?.map(
        (item: PerformaceType) =>
          item.email === actions.payload.email ? actions.payload : item
      );
      const exist = newPerformance.filter(
        (item: PerformaceType) => item.email === actions.payload.email
      ).length;

      if (exist) {
        state.employeePerformance = newPerformance;
      } else {
        state.employeePerformance.push(actions.payload);
      }
    },
    updatePassword: (state, actions) => {
      state.allEmployees = state.allEmployees.map((employee: Employee) =>
        employee.authInfo.email === actions.payload?.authInfo?.email
          ? actions.payload
          : employee
      );
    },
  },
});

export const {
  addEmployee,
  deleteEmployee,
  setSearch,
  loginUser,
  logoutUser,
  editProfile,
  addTask,
  editImage,
  addLeave,
  setTaskStatus,
  setLeaveStatus,
  addHrEvent,
  addTodayEvent,
  addAttendance,
  updateAttendance,
  addPerformance,
  updatePassword,
} = authSlice.actions;
export default authSlice.reducer;
