import { Router } from "express";
import { ProfileController } from "../controllers/profileController.js";
import { authenticate } from "../middleware/authenticate.js";

// Router for protected user profile routes
// All routes here require a valid JWT token (verified by authenticate)
const router = Router();
const profileController = new ProfileController();

// GET /api/me — Returns the authenticated user's info
// Used to restore the frontend session after a page refresh
router.get("/me", authenticate, profileController.me);

export default router;
