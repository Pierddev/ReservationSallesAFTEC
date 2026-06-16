import { AppDataSource } from "../database/data-source.js";
import { Building } from "../entity/Building.entity.js";

export class BulidingService {
	async getAll(): Promise<Building[]> {
		const buildingRepository = AppDataSource.getRepository(Building);
		return await buildingRepository.find();
	}
}
