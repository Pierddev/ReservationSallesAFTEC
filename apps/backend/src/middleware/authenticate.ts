import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface AuthRequest extends Request {
	userId?: number;
	role?: string;
}

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get token from the HttpOnly cookie
	const token = req.cookies?.token;

	if (!token) {
		return res.status(401).json({
			message: "No token provided",
		});
	}

	const secret = env.jwtSecret;
	if (!secret) {
		return res.status(500).json({
			message: "Internal server error: JWT secret not configured",
		});
	}

	try {
		const decoded = jwt.verify(token, secret) as {
			userId: number;
			role: string;
		};

		(req as AuthRequest).userId = decoded.userId;
		(req as AuthRequest).role = decoded.role;

		next();
	} catch (error) {
		return res.status(401).json({
			message: (error as Error).message,
		});
	}
};
