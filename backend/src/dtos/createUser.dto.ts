import { z } from "zod";

export const createUserSchema = z.object({
	firstname: z
		.string()
		.min(1, "Le prénom est obligatoire")
		.max(50, "Le prénom est trop long (50 caractères maximum)"),
	lastname: z
		.string()
		.min(1, "Le nom est obligatoire")
		.max(50, "Le nom est trop long (50 caractères maximum)"),
	email: z.email("L'email doit être valide"),
	password: z
		.string()
		.min(10, "Le mot de passe doit faire au moins 10 caractères"),
});

export type createUserDto = z.infer<typeof createUserSchema>;
