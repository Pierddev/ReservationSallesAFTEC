import { Router } from "express";
import { BookingController } from "../controllers/bookingController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
const bookingController = new BookingController();

router.get(
	"/get-booking-by-classroom/:classroomId",
	authenticate,
	bookingController.getByClassroom,
);

export default router;
