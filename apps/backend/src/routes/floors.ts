import { Router } from "express";
import { FloorController } from "../controllers/floorController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const floorController = new FloorController();

router.get(
	"/get-floor-by-building/:buildingId",
	authenticate,
	floorController.getByBuilding,
);

export default router;
