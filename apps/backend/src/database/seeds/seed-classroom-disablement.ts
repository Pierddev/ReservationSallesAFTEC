import type { DataSource } from "typeorm";
import type { Classroom } from "../../entity/Classroom.entity.js";
import { ClassroomDisablement } from "../../entity/ClassroomDisablement.entity.js";

/**
 * Génère des indisponibilités de salles (disablements) pour la base de données.
 * Niveau BTS SIO - Code clair, commenté et structuré.
 */
export async function seedClassroomDisablements(
	dataSource: DataSource,
	classrooms: Classroom[],
): Promise<ClassroomDisablement[]> {
	const repo = dataSource.getRepository(ClassroomDisablement);

	// Si aucune salle n'est disponible, on ne peut pas créer d'indisponibilités
	if (classrooms.length === 0) {
		console.warn(
			"Impossible de créer des indisponibilités : aucune salle disponible.",
		);
		return [];
	}

	// Fonction utilitaire pour trouver une salle par son nom
	const getRoom = (name: string) => classrooms.find((c) => c.name === name);

	// Date de référence (aujourd'hui, à la minute près)
	const today = new Date();
	today.setSeconds(0);
	today.setMilliseconds(0);

	// Fonction utilitaire pour calculer une date avec un décalage en jours, heures et minutes
	const getDayWithTime = (daysOffset: number, hours: number, minutes = 0) => {
		const d = new Date(today);
		d.setDate(d.getDate() + daysOffset);
		d.setHours(hours, minutes, 0, 0);
		return d;
	};

	// Données de test réalistes pour les indisponibilités de salles
	const disablementsData = [
		{
			classroomName: "Salle A202",
			start_at: getDayWithTime(0, 8, 0), // Aujourd'hui de 08h00...
			end_at: getDayWithTime(0, 12, 0), // ...à 12h00
			reason: "Maintenance informatique (mise à jour des postes clients)",
		},
		{
			classroomName: "Salle B202",
			start_at: getDayWithTime(1, 8, 0), // Demain de 08h00...
			end_at: getDayWithTime(2, 18, 0), // ...à après-demain 18h00
			reason: "Travaux de peinture et rénovation des sols",
		},
		{
			classroomName: "Salle C102",
			start_at: getDayWithTime(-1, 14, 0), // Hier de 14h00...
			end_at: getDayWithTime(-1, 18, 0), // ...à 18h00
			reason: "Dégât des eaux (intervention plomberie d'urgence)",
		},
	];

	const disablements: ClassroomDisablement[] = [];

	for (const data of disablementsData) {
		const classroom = getRoom(data.classroomName);

		// Si la salle n'existe pas dans le seed, on passe à la suite sans bloquer
		if (!classroom) {
			console.warn(
				`Salle non trouvée pour l'indisponibilité : ${data.classroomName}`,
			);
			continue;
		}

		// Recherche si l'indisponibilité existe déjà pour cette salle aux mêmes horaires
		// (Évite les doublons en cas de lancement successif du seed)
		let disablement = await repo.findOne({
			where: {
				classroom: { id: classroom.id },
				start_at: data.start_at,
				end_at: data.end_at,
			},
			relations: { classroom: true },
		});

		// Si l'indisponibilité n'existe pas, on la crée
		if (!disablement) {
			disablement = repo.create({
				classroom,
				start_at: data.start_at,
				end_at: data.end_at,
				reason: data.reason,
			});
			await repo.save(disablement);
		}

		disablements.push(disablement);
	}

	return disablements;
}
