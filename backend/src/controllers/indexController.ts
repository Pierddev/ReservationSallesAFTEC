import type { Request, Response } from "express";
import { createUserSchema } from "../dtos/createUser.dto.js";
import { loginUserSchema } from "../dtos/loginUser.dto.js";
import { UserService } from "../services/indexService.js";

// Controller for non-authenticated users
export class IndexController {
	home(_req: Request, res: Response) {
		res.send("Reservation Salles API");
	}

	async register(req: Request, res: Response) {
		// Validate request body (req.body) with Zod
		const result = createUserSchema.safeParse(req.body);

		// If validation fails send 400 with error message
		if (!result.success) {
			return res.status(400).json({
				message: "Failed to validate request",
				error: result.error.issues,
			});
		}

		const registerData = result.data;

		try {
			const userService = new UserService();
			const newUser = await userService.register(registerData);

			// Return success (201) message if user is created
			return res.status(201).json({
				message: "User registered successfully",
				user: {
					id: newUser.id,
					firstname: newUser.firstname,
					lastname: newUser.lastname,
					email: newUser.email,
					role: newUser.role.id,
				},
			});
		} catch (error) {
			return res.status(400).json({ message: (error as Error).message });
		}
	}

	async login(req: Request, res: Response) {
		// Validate login request body with Zod
		const result = loginUserSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Incorrect password or email address.",
				error: result.error.issues,
			});
		}

		try {
			const userService = new UserService();

			const { token, user } = await userService.login(result.data);

			// Set token in HttpOnly cookie (1 hour)
			res.cookie("token", token, {
				httpOnly: true,
				sameSite: "lax",
				secure: false, // true in production / HTTPS
			});

			// Return success message with user data
			return res.status(200).json({
				message: "User logged in successfully",
				user: {
					id: user.id,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					role: user.role.id,
				},
			});
		} catch (error) {
			return res.status(401).json({ message: (error as Error).message });
		}
	}

	logout(_req: Request, res: Response) {
		// Clear token cookie (same options as login)
		res.clearCookie("token", {
			httpOnly: true,
			sameSite: "lax",
			secure: false, // true in production / HTTPS
		});
		return res.status(200).json({ message: "User logged out successfully" });
	}
}
