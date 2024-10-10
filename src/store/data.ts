import { Employee } from "../components/types/employeeDataType";

export const customData: Employee[] = [
  {
    authInfo: { id: "hr-admin", email: "admin@mail.com", password: "admin" },
    about: {
      role: "human resource",
      service: "manager",
      phone: "9999911111",
      availability: { from: "8:00 AM", to: "5:30 PM" },
      office: "Hydrabad"
    },

    reportedBy: [],
    basicInfo: {
    
      firstName: "Human",

      lastName: "Resource",
    },
    work: {
      department: "Management",
      reportingTo: "admin@mail.com",
      title: "HR",
      dateofJoin: "09-10-2024",
    },
    personal: {
      mobileNo: 9999911111,
      dob: "30-12-2004",
      gender: "female",

      marigeStatus: "unmarid",
      address: "bhilwara",
    },

    profileImages: {},
  },
];
