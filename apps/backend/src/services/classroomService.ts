import { AppDataSource } from "../database/data-source.js";
import { Classroom } from "../entity/Classroom.entity.js";

export class ClassroomService {
	async getByFloor(floorId: number): Promise<Classroom[]> {
		const classroomRepository = AppDataSource.getRepository(Classroom);
		return await classroomRepository.find({
			where: { floor: { id: floorId } },
		});
	}
}
