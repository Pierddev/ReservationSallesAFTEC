import { AppDataSource } from "../database/data-source.js";
import { ClassroomEquipment } from "../entity/ClassroomEquipment.entity.js";

export class EquipmentService {
	async getAffectedByClassroom(
		classroomId: number,
	): Promise<ClassroomEquipment[]> {
		const classroomEquipmentRepository =
			AppDataSource.getRepository(ClassroomEquipment);
		return await classroomEquipmentRepository.find({
			where: { classroom: { id: classroomId } },
			relations: { equipment: true },
		});
	}
}
