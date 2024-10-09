import { ReactNode } from "react";

export type AttendanceType = {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
};

export type Availability = {
  from?: string;
  to?: string;
};

export type AuthInfo = {
  id: string;
  email: string;
  password: string;
};

export type About = {
  role?: string;
  service?: string;
  phone?: string;
  availability?: Availability;
  office?: string;
};

export type BasicInfo = {
  firstName?: string;
  lastName?: string;
};

export type Work = {
  department?: string;
  reportingTo?: string;
  title?: string;
  dateofJoin?: string;
};

export type Personal = {
  mobileNo?: number;
  dob?: string;
  gender?: string;
  otherMail?: string;
  marigeStatus?: string;
  address?: string;
};

export type LeaveTypeData = {
  title?: string;
  available?: number;
  booked?: number;
  icon?: ReactNode;
  color?: string;
};
export type LeaveData = {
  id?: string;
  email?: string;
  type?: string;
  title?: string;
  date?: string;
  status?: string;
  avatar?: ReactNode;
};

export type ImageData = {
  myImage?: string;
  bgImage?: string;
};

export type TaskDataType = {
  taskId: number;
  assignTo?: string;
  assignBy?: string;
  title?: string;
  discription?: string;
  taskDate?: string;
  isCompleted?: boolean;
};
export type TodayEventsType = {
  title: ReactNode;
  description: string;
  icon?: ReactNode;
  time: { start: string; end: string };
};
export type hrEventsType = {
  title: string;
  date: string;
  description: string;
};

export type Employee = {
  authInfo: AuthInfo;
  about?: About;
  reportedBy?: string[];
  basicInfo?: BasicInfo;
  work?: Work;
  personal?: Personal;
  profileImages: ImageData;
};
