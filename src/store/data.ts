import { Employee } from "../components/types/employeeDataType";

export const customData: Employee[] = [
  {
    authInfo: { id: "hr-admin", email: "admin@mail.com", password: "admin123" },
    about: {
      role: "human resource",
      service: "manager",
      phone: 9999911111,
      office: "Hydrabad",
    },

    basicInfo: {
      firstName: "Human",
      lastName: "Resource",
    },
    work: {
      department: "MANAGEMENT",
      reportingTo: "admin@mail.com",
      title: "HR",
      dateofJoin: "2023-01-10",
    },
    personal: {
      mobileNo: 9999911111,
      dob: "2001-02-24",
      gender: "female",

      marriageStatus: "unmarried",
      address: "bhilwara",
    },

    profileImages: {},
  },
  {
    authInfo: {
      id: "deepak-123",
      email: "deepak@mail.com",
      password: "deepak123",
    },
    about: {
      role: "software engineer",
      service: "middleware", 
      phone: 7297095896,
      office: "Hydrabad",
    },

    basicInfo: {
      firstName: "Deepak",
      lastName: "Panchal",
    },
    work: {
      department: "MOEI",
      reportingTo: "admin@mail.com",

      title: "Employee",
      dateofJoin: "2024-09-27",
    },
    personal: {
      mobileNo: 7297095896,
      dob: "2004-12-30",
      gender: "male",
      marriageStatus: "unmarried",
      address: "bhilwara",
    },

    profileImages: {},
  },
];
