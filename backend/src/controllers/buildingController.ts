import type { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate.js";
import { BulidingService } from "../services/buildingService.js";

export class BuildingController {
	async getAll(_req: AuthRequest, res: Response) {
		try {
			const buildingService = new BulidingService();
			const buildings = await buildingService.getAll();
			return res.status(200).json({ buildings });
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}
}
