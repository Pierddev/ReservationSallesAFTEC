import { AppDataSource } from "../database/data-source.js";
import { Booking } from "../entity/Booking.entity.js";

export class BookingService {
	async getByClassroom(classroomId: number): Promise<Booking[]> {
		const bookingReposotory = AppDataSource.getRepository(Booking);
		return await bookingReposotory.find({
			where: { classroom: { id: classroomId } },
		});
	}
}
