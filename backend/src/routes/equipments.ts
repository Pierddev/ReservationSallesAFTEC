import { Router } from "express";
import { EquipmentController } from "../controllers/equipmentController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const equipmentController = new EquipmentController();

router.get(
	"/classrooms/:classroomId/equipments",
	authenticate,
	equipmentController.getAffectedByClassroom,
);

export default router;
