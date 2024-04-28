import { z } from "zod";

let Temp_callstart = new Date();

export const CallReportSchema = z.object({
  bdm: z.string().min(1, { message: "BDM is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  consultant: z.string().min(1, { message: "Consultant is required" }),
  callStart: z
    .date({
      required_error: "Please select a date & time.",
      invalid_type_error: "Invalid date & time selected.",
    })
    .refine((value) => {
      return (Temp_callstart = value);
    }),
  callEnd: z
    .date({
      required_error: "Please select a date & time.",
      invalid_type_error: "Invalid date & time selected.",
    })
    .refine((value) => {
      if (Temp_callstart >= value) {
        return false;
      }
      return value;
    }),
  callType: z.string().min(1, { message: "Call Type is required" }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Please enter a valid phone number.",
    })
    .regex(/^[+]*\d+$$/, { message: "Phone number can only contain digits." }),
  reasonForCall: z.string().min(1, { message: "Reason for call is required" }),
  tagClients: z.array(z.string()).optional(),
  prospectiveClients: z
    .string()
    .min(1, { message: "์Prospective clients is required" }),
  prospectiveClientNames: z.string().optional(),
  pointsDiscussed: z
    .string()
    .min(1, { message: "Points discussed is required" })
    .max(500, { message: "Message must be between 1-500 characters long." }),
  nextCallDate: z //6
    .date({
      invalid_type_error: "Invalid date & time selected.",
    })
    .optional(),
  businessIdentified: z //5
    .string()
    .min(1, { message: "Business identified is required" }),
  gbp: z.string().optional(),
  usd: z.string().optional(), //4
  eur: z.string().optional(), //3
  other: z.string().optional(), //2
  anticipatedBusinessDate: z //1
    .date({
      invalid_type_error: "Invalid date & time selected.",
    })
    .optional(),
  attachments: z.any().optional(),
});
