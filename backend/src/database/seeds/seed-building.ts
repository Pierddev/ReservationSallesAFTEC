import type { DataSource } from "typeorm";
import { Building } from "../../entity/Building.entity.js";

export async function seedBuildings(
	dataSource: DataSource,
): Promise<Building[]> {
	const repo = dataSource.getRepository(Building);
	const buildingNames = ["Bâtiment A", "Bâtiment B", "Bâtiment C"];
	const buildings: Building[] = [];

	for (const name of buildingNames) {
		let building = await repo.findOne({ where: { name } });
		if (!building) {
			building = repo.create({ name });
			await repo.save(building);
		}
		buildings.push(building);
	}

	return buildings;
}
