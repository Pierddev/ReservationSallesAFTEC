import { z } from "zod";

export const loginUserSchema = z.object({
	email: z.email("L'email doit être valide"),
	password: z
		.string()
		.min(10, "Le mot de passe doit faire au moins 10 caractères"),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
