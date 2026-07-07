import type { Request, Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { basicAuth } from "../middleware/basicAuth.js";

// Router for protected user profile routes
// All routes here require a valid JWT token (verified by authenticate)
const adminRouter = Router();
const userController = new UserController();

adminRouter.get("/basic", basicAuth, (_req: Request, res: Response) => {
	res.json({ data: "Cet utilisateur a le droit de voir cette page" });
});
adminRouter.get("/users", authenticate, userController.getAll);

export default adminRouter;
