import { Employee } from "../components/types/employeeDataType";

export const customData: Employee[] = [
  {
    authInfo: { id: "hr-admin", email: "admin@mail.com", password: "admin123" },
    about: {
      role: "human resource",
      service: "manager",
<<<<<<< HEAD
      phone: 9999911111,
      office: "Hydrabad",
=======
      phone: "9999911111",
      availability: { from: "8:00 AM", to: "5:30 PM" },
      office: "Hydrabad"
>>>>>>> d84fcbf788d1b0592b9459f11588a18130dfd5c7
    },

    basicInfo: {
<<<<<<< HEAD
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
=======
    
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
>>>>>>> d84fcbf788d1b0592b9459f11588a18130dfd5c7
      gender: "female",

      marriageStatus: "unmarried",
      address: "bhilwara",
    },

    profileImages: {},
  },
<<<<<<< HEAD
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
=======
>>>>>>> d84fcbf788d1b0592b9459f11588a18130dfd5c7
];
