import { Router } from "express";
import { ClassroomController } from "../controllers/classroomController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const classroomController = new ClassroomController();

router.get(
	"/get-classroom-by-floor/:floorId",
	authenticate,
	classroomController.getByFloor,
);

export default router;
