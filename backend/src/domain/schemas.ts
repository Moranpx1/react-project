import { z } from "zod"

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const tasksPostRequestSchema = z.object({
    task: z.string(),
    description: z.string(),
    status: z.string(),
    end_time: z.string()
});