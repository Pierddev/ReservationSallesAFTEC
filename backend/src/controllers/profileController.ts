import type { Response } from "express";
import type { AuthRequest } from "../middleware/authenticate.js";
import { ProfileService } from "../services/profileService.js";

// Controller for routes related to the authenticated user's profile
// All these routes require the authenticate middleware (valid JWT)
export class ProfileController {
	// GET /me — Returns the authenticated user's information
	// Used by the frontend to restore the session after a page refresh
	// The userId is extracted from the JWT token by the authenticate middleware
	async me(req: AuthRequest, res: Response) {
		try {
			const profileService = new ProfileService();
			const user = await profileService.getProfile(req.userId!);

			return res.status(200).json({
				user: {
					id: user.id,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					role: user.role.id,
					roleName: user.role.name,
				},
			});
		} catch (error) {
			return res.status(401).json({ message: (error as Error).message });
		}
	}
}
