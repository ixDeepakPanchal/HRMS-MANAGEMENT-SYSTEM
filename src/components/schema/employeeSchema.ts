import { z } from "zod";

export const schema = z.object({
  authInfo: z.object({
    id: z.string().min(1, { message: "Please enter employee ID" }),
    email: z
      .string()
      .min(1, { message: "Please enter email address" })

      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
  about: z.object({
    role: z.string().min(1, { message: "Role is required" }),
    service: z.string().min(1, { message: "Service is required" }),
    phone: z.string(),
    availability: z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    }),
    office: z.string().min(1, { message: "Office is required" }),
  }),
  basicInfo: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  }),
  work: z.object({
    department: z.string().min(1, { message: "Department is required" }),
    reportingTo: z.string().min(1, { message: "Reporting To is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    dateofJoin: z.string(),
  }),
  personal: z.object({
    mobileNo: z.string(),
    dob: z.string(),
    gender: z.string().min(1, { message: "Gender is required" }),
    marigeStatus: z.string(),
    address: z.string(),
  }),
  profileImages: z.object({}).optional(),
});

export type SchemaType = z.infer<typeof schema>;
