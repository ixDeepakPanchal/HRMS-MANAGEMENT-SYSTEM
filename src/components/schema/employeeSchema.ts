import { z } from "zod";

// export const employeeSchema = z.object({
//   authInfo: z.object({
//     id: z.string({ required_error: "Please enter employee ID" }),
//     email: z
//       .string({ required_error: "Please enter email address" })
//       .email({ message: "Please enter a valid email address" }),
//     password: z
//       .string()
//       .min(6, { message: "Password must be at least 6 characters long" }),
//   }),
//   about: z.object({
//     role: z.string({ required_error: "Role is required" }),
//     service: z.string({ required_error: "Service is required" }),
//     phone: z
//       .string()
//       .optional()
//       .nullable()
//       .refine((val) => !val || /^[0-9]+$/.test(val), {
//         message: "Phone number must be a valid number",
//       }),
//     office: z.string({ required_error: "Office is required" }),
//   }),
//   basicInfo: z.object({
//     firstName: z.string({ required_error: "First name is required" }),
//     lastName: z.string({ required_error: "Last name is required" }),
//   }),
//   work: z.object({
//     department: z.string({ required_error: "Department is required" }),
//     reportingTo: z.string({ required_error: "Reporting To is required" }),
//     title: z.string({ required_error: "Title is required" }),
//     dateofJoin: z.string().optional(),
//   }),
//   personal: z.object({
//     mobileNo: z
//       .string()
//       .optional()
//       .nullable()
//       .refine((val) => !val || /^[0-9]+$/.test(val), {
//         message: "Phone number must be a valid number",
//       }),
//     dob: z.string().optional(),
//     gender: z.string({ required_error: "Gender is required" }),
//     marriageStatus: z.string().optional(),
//     address: z.string(),
//   }),
//   profileImages: z
//     .object({
//       myImage: z.string().optional(),
//     })
//     .optional(),
// });

export const employeeSchema = z.object({
  authInfo: z.object({
    id: z.string({ required_error: "This field is required" }).nullable(),
    email: z
      .string({required_error: "This field is required" })
      .email({ message: "Please enter a valid email address" })
      .nullable(),
    password: z
      .string({required_error: "This field is required"})
      .min(6, { message: "Password must be at least 6 characters long" })
      .nullable(),
  }),
  about: z.object({
    role: z.string({ required_error: "This field is required"}).nullable(),
    service: z.string({ required_error: "This field is required"}).nullable(),
    phone: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || /^[0-9]+$/.test(val), {
        message: "Phone number must be a valid number",
      }),
    office: z.string({ required_error: "Office is required" }).nullable(),
  }),
  basicInfo: z.object({
    firstName: z.string({ required_error: "This field is required" }).nullable(),
    lastName: z.string({required_error: "This field is required"}).nullable(),
  }),
  work: z.object({
    department: z.string({ required_error: "This field is required" }).nullable(),
    reportingTo: z.string({required_error: "This field is required" }).nullable(),
    title: z.string({ required_error: "This field is required" }).nullable(),
    dateofJoin: z.string().optional().nullable(),
  }),
  personal: z.object({
    mobileNo: z
      .number()
      .optional()
      .nullable()
      // .refine((val) => !val , {
      //   message: "Phone number must be a valid number",
      // })
      ,
    dob: z.string().optional().nullable(),
    gender: z.string({ required_error: "This field is required" }).nullable(),
    marriageStatus: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
  }),
  profileImages: z
    .object({
      myImage: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type SchemaType = z.infer<typeof employeeSchema>;
