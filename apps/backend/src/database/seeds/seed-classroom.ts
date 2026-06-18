import type { DataSource } from "typeorm";
import { Classroom } from "../../entity/Classroom.entity.js";
import type { Floor } from "../../entity/Floor.entity.js";

export async function seedClassrooms(
	dataSource: DataSource,
	floors: Floor[],
): Promise<Classroom[]> {
	const repo = dataSource.getRepository(Classroom);

	// Trouver les étages requis
	const floor1A = floors.find(
		(f) => f.level === 1 && f.building?.name === "Bâtiment A",
	);
	const floor2A = floors.find(
		(f) => f.level === 2 && f.building?.name === "Bâtiment A",
	);
	const floor1B = floors.find(
		(f) => f.level === 1 && f.building?.name === "Bâtiment B",
	);
	const floor2B = floors.find(
		(f) => f.level === 2 && f.building?.name === "Bâtiment B",
	);
	const floor1C = floors.find(
		(f) => f.level === 1 && f.building?.name === "Bâtiment C",
	);
	const floor2C = floors.find(
		(f) => f.level === 2 && f.building?.name === "Bâtiment C",
	);

	if (!floor1A || !floor2A || !floor1B || !floor2B || !floor1C || !floor2C) {
		throw new Error(
			"Certains étages requis sont manquants pour le seed des salles.",
		);
	}

	const classroomsData = [
		{ name: "A101", capacity: 30, floor: floor1A },
		{ name: "A102", capacity: 25, floor: floor1A },
		{ name: "A201", capacity: 30, floor: floor2A },
		{ name: "A202", capacity: 20, floor: floor2A },
		{ name: "B101", capacity: 35, floor: floor1B },
		{ name: "B102", capacity: 30, floor: floor1B },
		{ name: "B201", capacity: 40, floor: floor2B },
		{ name: "B202", capacity: 25, floor: floor2B },
		{ name: "C201", capacity: 30, floor: floor2C },
		{ name: "C202", capacity: 30, floor: floor2C },
	];

	const classrooms: Classroom[] = [];

	// 1. Gérer C100 (qui peut être parent)
	let c100 = await repo.findOne({
		where: { name: "C100" },
		relations: { floor: true },
	});
	if (!c100) {
		c100 = repo.create({ name: "C100", capacity: 60, floor: floor1C });
		await repo.save(c100);
	}
	classrooms.push(c100);

	// 2. Gérer C101 et C102 (qui ont C100 comme parent)
	const divisibleSpecs = [
		{ name: "C101", capacity: 30, floor: floor1C, parentClassroom: c100 },
		{ name: "C102", capacity: 30, floor: floor1C, parentClassroom: c100 },
	];

	for (const spec of divisibleSpecs) {
		let room = await repo.findOne({
			where: { name: spec.name },
			relations: { floor: true, parentClassroom: true },
		});
		if (!room) {
			room = repo.create(spec);
			await repo.save(room);
		}
		classrooms.push(room);
	}

	// 3. Gérer les autres salles
	for (const data of classroomsData) {
		let room = await repo.findOne({
			where: { name: data.name },
			relations: { floor: true },
		});
		if (!room) {
			room = repo.create(data);
			await repo.save(room);
		}
		classrooms.push(room);
	}

	return classrooms;
}
