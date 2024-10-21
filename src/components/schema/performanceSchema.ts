import { z } from "zod";

export const performanceSchema = z.object({
  email: z.string({ required_error: "Please enter employee" }),
  date: z.string().optional(),
  workQuality: z.string({ required_error: "Please select performance" }),
  attandanceReview: z.string({ required_error: "Please select performance" }),
  workEfficiency: z.string({ required_error: "Please select performance" }),
  adherenceOfWork: z.string({ required_error: "Please select performance" }),
  taskCompletion: z.string({ required_error: "Please select performance" }),
  feedback: z.string().optional(),
  overallPerformance: z.string().optional(),
});
