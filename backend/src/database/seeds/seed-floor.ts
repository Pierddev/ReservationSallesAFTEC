import type { DataSource } from "typeorm";
import type { Building } from "../../entity/Building.entity.js";
import { Floor } from "../../entity/Floor.entity.js";

export async function seedFloors(
	dataSource: DataSource,
	buildings: Building[],
): Promise<Floor[]> {
	const repo = dataSource.getRepository(Floor);

	const buildingA = buildings.find((b) => b.name === "Bâtiment A");
	const buildingB = buildings.find((b) => b.name === "Bâtiment B");
	const buildingC = buildings.find((b) => b.name === "Bâtiment C");

	if (!buildingA || !buildingB || !buildingC) {
		throw new Error(
			"Certains bâtiments requis sont manquants pour le seed des étages.",
		);
	}

	const floorSpecs = [
		{ level: 1, building: buildingA },
		{ level: 2, building: buildingA },
		{ level: 1, building: buildingB },
		{ level: 2, building: buildingB },
		{ level: 1, building: buildingC },
		{ level: 2, building: buildingC },
	];

	const floors: Floor[] = [];

	for (const spec of floorSpecs) {
		let floor = await repo.findOne({
			where: {
				level: spec.level,
				building: { id: spec.building.id },
			},
			relations: { building: true },
		});
		if (!floor) {
			floor = repo.create(spec);
			await repo.save(floor);
		}
		floors.push(floor);
	}

	return floors;
}
