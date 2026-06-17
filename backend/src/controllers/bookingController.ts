import type { Response } from "express";
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
}
