import { AppDataSource } from "../database/data-source.js";
import { Floor } from "../entity/Floor.entity.js";

export class FloorService {
	async getByBuilding(buildingId: number): Promise<Floor[]> {
		const floorRepository = AppDataSource.getRepository(Floor);
		return await floorRepository.find({
			where: { building: { id: buildingId } },
		});
	}
}
