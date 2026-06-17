import type { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate.js";
import { ClassroomService } from "../services/classroomService.js";

export class ClassroomController {
	async getByFloor(req: AuthRequest, res: Response) {
		try {
			const floorId = Number(req.params.floorId);

			if (Number.isNaN(floorId)) {
				return res.status(400).json({ message: "Paramètre floorId invalide" });
			}

			const classroomService = new ClassroomService();
			const classrooms = await classroomService.getByFloor(floorId);
			return res.status(200).json({ classrooms });
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}
}
