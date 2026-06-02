import type { Request, Response } from "express";

// Controller for non-authenticated users
export class IndexController {
	home(_req: Request, res: Response) {
		res.send("Reservation Salles API");
	}
}
