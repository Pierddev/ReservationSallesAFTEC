import type { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate.js";
import { FloorService } from "../services/floorService.js";

export class FloorController {
	async getByBuilding(req: AuthRequest, res: Response) {
		try {
			const buildingId = Number(req.params.buildingId);

			if (Number.isNaN(buildingId)) {
				return res
					.status(400)
					.json({ message: "Paramètre buildingId Invalide" });
			}

			const floorService = new FloorService();
			const floors = await floorService.getByBuilding(buildingId);
			return res.status(200).json({ floors });
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}
}
