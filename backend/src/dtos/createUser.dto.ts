import { z } from "zod";

export const createUserSchema = z.object({
	firstname: z.string().min(1, "Le prénom est obligatoire"),
	lastname: z.string().min(1, "Le nom est obligatoire"),
	email: z.email("L'email doit être valide"),
	password: z
		.string()
		.min(10, "Le mot de passe doit faire au moins 10 caractères"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
