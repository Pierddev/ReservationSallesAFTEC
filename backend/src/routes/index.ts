import type { Request, Response } from "express";
import { Router } from "express";
import { IndexController } from "../controllers/indexController.js";

const router = Router();
const indexController = new IndexController();

// Base routes
router.get("/", indexController.home);

// Test route
router.post("/", (_req: Request, res: Response) => {
	res.json({ message: "Bienvenur sur l'API" });
});

export default router;
