import { z } from "zod";

export const createBookingSchema = z
	.object({
		title: z.string().min(1, "Le titre est obligatoire").max(100),
		reservedForUserId: z.number({
			message: "La réservation doit être associée à un utilisateur",
		}),
		classroomId: z.number({ message: "La salle est obligatoire" }),
		start_at: z.coerce.date({ message: "La date de début est obligatoire" }),
		end_at: z.coerce.date({ message: "La date de fin est obligatoire" }),
		equipmentIds: z.array(z.number()).optional(),
	})
	.refine((data) => data.end_at > data.start_at, {
		message: "La date de fin doit être supérieure à la date de début",
		path: ["end_at"], // Sert à préciser le champ auquel sera associée l'erreur de validation générée par .refine()
	});

export type createBookingDto = z.infer<typeof createBookingSchema>;
