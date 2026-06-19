import type { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate.js";
import { EquipmentService } from "../services/equipmentService.js";

export class EquipmentController {
	async getAffectedByClassroom(req: AuthRequest, res: Response) {
		try {
			const classroomId = Number(req.params.classroomId);

			if (Number.isNaN(classroomId)) {
				return res
					.status(400)
					.json({ message: "Paramètre classroomId invalide" });
			}

			const equipmentService = new EquipmentService();
			const affectedEquipments =
				await equipmentService.getAffectedByClassroom(classroomId);
			return res.status(200).json({ affectedEquipments });
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}
}
