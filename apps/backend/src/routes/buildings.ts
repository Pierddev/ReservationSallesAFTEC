import { Router } from "express";
import { BuildingController } from "../controllers/buildingController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const buildingController = new BuildingController();

router.get("/get-building", authenticate, buildingController.getAll);

export default router;
