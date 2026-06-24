import type { Request, Response } from "express";
import { Router } from "express";
import { basicAuth } from "../middleware/basicAuth.js";

// Router for protected user profile routes
// All routes here require a valid JWT token (verified by authenticate)
const adminRouter = Router();

adminRouter.get("/basic", basicAuth, (_req: Request, res: Response) => {
	res.json({ data: "Cet utilisateur a le droit de voir cette page" });
});

export default adminRouter;
