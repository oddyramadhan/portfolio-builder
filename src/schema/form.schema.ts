import { z } from "zod"

export const formSchema = z.object({
  id: z.string().optional(),
  backgroundImage: z.any(),
  profileImage: z.any(),
  profile: z.object({
    name: z.string().min(2, "Name is required"),
    position: z.string().min(2, "Position is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  }),
  portfolios: z.array(
    z
      .object({
        name: z.string().min(2, "Name is required"),
        position: z.string().min(2, "Position is required"),
        description: z
          .string()
          .min(10, "Description must be at least 10 characters"),
        company: z.string().min(2, "Company is required"),
        startDate: z
          .date()
          .refine(
            (date) => date instanceof Date && !isNaN(date.getTime()),
            "Start date is required"
          ),
        endDate: z
          .date()
          .refine(
            (date) => date instanceof Date && !isNaN(date.getTime()),
            "End date is required"
          ),
      })
      .refine((data) => data.startDate <= new Date(), {
        message: "Start date cannot be in the future",
        path: ["startDate"],
      })
      .refine((data) => data.endDate <= new Date(), {
        message: "End date cannot be in the future",
        path: ["endDate"],
      })
      .refine((data) => data.startDate <= data.endDate, {
        message: "Start date must be before end date",
        path: ["startDate"],
      })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;