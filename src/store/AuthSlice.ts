import { createSlice } from "@reduxjs/toolkit";
import { customData } from "./data";
import {
  AttendanceType,
  Employee,
  hrEventsType,
  LeaveData,
  TaskDataType,
  TodayEventsType,
} from "../components/types/employeeDataType";

type InitialDataType = {
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
    addEmployee: (state, actions) => {
      state.allEmployees.push(actions.payload);
    },
    deleteEmployee: (state, actions) => {
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
      state.attendanceList=  state.attendanceList.map((item) =>
        item.id === actions.payload.id && item.date === actions.payload.date
          ? {checkIn:item.checkIn,...actions.payload}
          : item
      );
    },
    editProfile: (state, actions) => {
      state.authUser = actions.payload;
      state.allEmployees = state.allEmployees.map((employeee: Employee) =>
        employeee.authInfo.email === state.authUser?.authInfo.email
          ? state.authUser
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
  updateAttendance
} = authSlice.actions;
export default authSlice.reducer;
