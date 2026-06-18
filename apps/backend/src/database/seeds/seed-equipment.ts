import type { DataSource } from "typeorm";
import { Equipment } from "../../entity/Equipment.entity.js";

export async function seedEquipments(
	dataSource: DataSource,
): Promise<Equipment[]> {
	const repo = dataSource.getRepository(Equipment);

	const equipmentNames = [
		"Vidéo-projecteur",
		"Enceintes audio",
		"Tableau interactif",
		"Kit de visio-conférence",
		"Wi-Fi",
		"Climatisation",
	];
	const equipments: Equipment[] = [];

	for (const name of equipmentNames) {
		let equipment = await repo.findOne({ where: { name } });
		if (!equipment) {
			equipment = repo.create({ name });
			await repo.save(equipment);
		}
		equipments.push(equipment);
	}

	return equipments;
}
