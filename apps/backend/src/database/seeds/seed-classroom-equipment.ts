import type { DataSource } from "typeorm";
import type { Classroom } from "../../entity/Classroom.entity.js";
import { ClassroomEquipment } from "../../entity/ClassroomEquipment.entity.js";
import type { Equipment } from "../../entity/Equipment.entity.js";

/**
 * Génère les affectations de matériel aux salles (ClassroomEquipment).
 * Niveau BTS SIO - Code clair, commenté et structuré.
 */
export async function seedClassroomEquipments(
	dataSource: DataSource,
	equipments: Equipment[],
	classrooms: Classroom[],
): Promise<ClassroomEquipment[]> {
	const repo = dataSource.getRepository(ClassroomEquipment);

	// Si aucun matériel ou aucune salle, on ne fait rien
	if (equipments.length === 0 || classrooms.length === 0) {
		console.warn(
			"Impossible d'affecter du matériel : salles ou équipements manquants.",
		);
		return [];
	}

	// Fonctions utilitaires pour récupérer les entités par leur nom
	const getRoom = (name: string) => classrooms.find((c) => c.name === name);
	const getEquipment = (name: string) =>
		equipments.find((e) => e.name === name);

	// Date de référence pour les affectations temporaires
	const today = new Date();
	today.setSeconds(0);
	today.setMilliseconds(0);

	const getDayWithTime = (daysOffset: number, hours: number, minutes = 0) => {
		const d = new Date(today);
		d.setDate(d.getDate() + daysOffset);
		d.setHours(hours, minutes, 0, 0);
		return d;
	};

	// Définition des affectations de test (permanentes ou temporaires)
	const assignmentsData = [
		// Affectations permanentes (start_at et end_at sont null)
		{
			classroomName: "A101",
			equipmentName: "Vidéo-projecteur",
			start_at: null,
			end_at: null,
		},
		{
			classroomName: "A101",
			equipmentName: "Enceintes audio",
			start_at: null,
			end_at: null,
		},
		{
			classroomName: "B101",
			equipmentName: "Tableau interactif",
			start_at: null,
			end_at: null,
		},
		{
			classroomName: "A102",
			equipmentName: "Climatisation",
			start_at: null,
			end_at: null,
		},
		// Affectation temporaire (ex. prêt d'un kit de visio pour un cours spécifique)
		{
			classroomName: "A102",
			equipmentName: "Kit de visio-conférence",
			start_at: getDayWithTime(0, 8, 0), // Aujourd'hui de 08h00...
			end_at: getDayWithTime(0, 18, 0), // ...à 18h00
		},
	];

	const classroomEquipments: ClassroomEquipment[] = [];

	for (const data of assignmentsData) {
		const classroom = getRoom(data.classroomName);
		const equipment = getEquipment(data.equipmentName);

		if (!classroom) {
			console.warn(
				`Salle non trouvée pour l'affectation de matériel : ${data.classroomName}`,
			);
			continue;
		}

		if (!equipment) {
			console.warn(
				`Équipement non trouvé pour l'affectation : ${data.equipmentName}`,
			);
			continue;
		}

		// Récupérer les affectations existantes de cette salle pour éviter les doublons
		const existingAssignments = await repo.find({
			where: { classroom: { id: classroom.id } },
			relations: { equipment: true },
		});

		// Vérifier si cette affectation de matériel avec les mêmes horaires existe déjà
		const isDuplicate = existingAssignments.some((assignment) => {
			const isSameEquipment = assignment.equipment.id === equipment.id;
			const isSameStart =
				(assignment.start_at === null && data.start_at === null) ||
				(assignment.start_at !== null &&
					data.start_at !== null &&
					new Date(assignment.start_at).getTime() === data.start_at.getTime());
			const isSameEnd =
				(assignment.end_at === null && data.end_at === null) ||
				(assignment.end_at !== null &&
					data.end_at !== null &&
					new Date(assignment.end_at).getTime() === data.end_at.getTime());

			return isSameEquipment && isSameStart && isSameEnd;
		});

		// Si l'affectation n'existe pas, on la crée
		if (!isDuplicate) {
			const classroomEquipment = repo.create({
				classroom,
				equipment,
				start_at: data.start_at,
				end_at: data.end_at,
			});
			await repo.save(classroomEquipment);
			classroomEquipments.push(classroomEquipment);
		} else {
			// Si elle existe, on l'ajoute à la liste des affectations retournées
			const existing = existingAssignments.find((assignment) => {
				const isSameEquipment = assignment.equipment.id === equipment.id;
				const isSameStart =
					(assignment.start_at === null && data.start_at === null) ||
					(assignment.start_at !== null &&
						data.start_at !== null &&
						new Date(assignment.start_at).getTime() ===
							data.start_at.getTime());
				const isSameEnd =
					(assignment.end_at === null && data.end_at === null) ||
					(assignment.end_at !== null &&
						data.end_at !== null &&
						new Date(assignment.end_at).getTime() === data.end_at.getTime());

				return isSameEquipment && isSameStart && isSameEnd;
			});
			if (existing) {
				classroomEquipments.push(existing);
			}
		}
	}

	return classroomEquipments;
}
