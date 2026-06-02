import type { Request, Response } from "express"

// Controller for non-authenticated users
export class IndexController {
    home(req: Request, res: Response) {
        res.send('Reservation Salles API')
    }
}