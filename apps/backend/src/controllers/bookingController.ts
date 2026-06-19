import type { Response } from "express";
import { createBookingSchema } from "../dtos/createBooking.dto.js";
import type { AuthRequest } from "../middleware/authenticate.js";
import { BookingService } from "../services/bookingService.js";

export class BookingController {
	async getByClassroom(req: AuthRequest, res: Response) {
		try {
			const classroomId = Number(req.params.classroomId);

			if (Number.isNaN(classroomId)) {
				return res
					.status(400)
					.json({ message: "Paramètre classroomId invalide" });
			}

			const bookingService = new BookingService();
			const bookings = await bookingService.getByClassroom(classroomId);
			return res.status(200).json({ bookings });
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}

	async create(req: AuthRequest, res: Response) {
		const result = createBookingSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Failed to validate request",
				error: result.error.issues,
			});
		}

		const bookingData = result.data;
		const userId = req.userId;

		// Vérification que userId n'est pas undefined, ce qui bloquerai lors de l'initialisation de newBooking
		if (userId === undefined) {
			return res.status(401).json({ message: "Utilisateur non authentifié" });
		}

		try {
			const bookingService = new BookingService();
			const newBooking = await bookingService.create(bookingData, userId);

			return res.status(201).json({
				message: "Booking saved successfully",
				booking: {
					title: newBooking.title,
					user: req.userId,
					reservedForUser: newBooking.reservedForUser,
					classroom: newBooking.classroom,
					created_at: newBooking.created_at,
					start_at: newBooking.start_at,
					end_at: newBooking.end_at,
				},
			});
		} catch (error) {
			return res.status(400).json({ message: (error as Error).message });
		}
	}
}
