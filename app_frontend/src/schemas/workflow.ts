import { z } from "zod";

export const workflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
});

export type WorkflowType = z.infer<typeof workflowSchema>;
