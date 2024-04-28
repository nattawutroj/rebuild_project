import { z } from "zod";

export const rejectSchema = z.object({
  remark: z.string().optional(),
});
