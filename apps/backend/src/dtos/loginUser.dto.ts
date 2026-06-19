import { z } from "zod";

export const loginUserSchema = z.object({
	email: z.email("Email is not valid"),
	password: z.string().min(10, "Password must be at least 10 characters"),
});

export type loginUserDto = z.infer<typeof loginUserSchema>;
