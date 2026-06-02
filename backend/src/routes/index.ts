import { Router } from "express";
import type { Request, Response } from "express";
import { IndexController } from "../controllers/indexController.js";

const router = Router()
const indexController = new IndexController()


router.get("/", indexController.home);
router.post("/", (req: Request, res: Response) => {
	res.json({ message: "Bienvenur sur l'API" });
});

export default router