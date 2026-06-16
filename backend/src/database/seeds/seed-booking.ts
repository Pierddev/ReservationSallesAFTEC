import type { DataSource } from "typeorm";
import { Booking } from "../../entity/Booking.entity.js";
import type { Classroom } from "../../entity/Classroom.entity.js";
import type { User } from "../../entity/User.entity.js";

export async function seedBookings(
	dataSource: DataSource,
	classrooms: Classroom[],
	users: User[],
): Promise<Booking[]> {
	const repo = dataSource.getRepository(Booking);

	if (classrooms.length === 0 || users.length === 0) {
		console.warn(
			"Impossible de créer des réservations : aucune salle ou aucun utilisateur disponible.",
		);
		return [];
	}

	const adminUser = users[0] as User;
	const teacherUser = users[1] ?? adminUser;
	const studentUser = users[2] ?? adminUser;

	const getRoom = (name: string) =>
		classrooms.find((c) => c.name === name) ?? (classrooms[0] as Classroom);

	const today = new Date();
	today.setSeconds(0);
	today.setMilliseconds(0);

	const getDayWithTime = (daysOffset: number, hours: number, minutes = 0) => {
		const d = new Date(today);
		d.setDate(d.getDate() + daysOffset);
		d.setHours(hours, minutes, 0, 0);
		return d;
	};

	const bookingsData = [
		{
			title: "Cours d'Algorithmique",
			user: teacherUser,
			reservedForUser: teacherUser,
			classroom: getRoom("Salle A101"),
			created_at: getDayWithTime(-2, 9, 0),
			start_at: getDayWithTime(0, 8, 30),
			end_at: getDayWithTime(0, 10, 30),
			code: "1234",
			code_generate_at: getDayWithTime(0, 8, 0),
			is_synced_to_iot: true,
		},
		{
			title: "Examen de Base de Données",
			user: teacherUser,
			reservedForUser: teacherUser,
			classroom: getRoom("Salle B101"),
			created_at: getDayWithTime(-2, 10, 0),
			start_at: getDayWithTime(0, 14, 0),
			end_at: getDayWithTime(0, 17, 0),
			code: "5678",
			code_generate_at: getDayWithTime(0, 13, 30),
			is_synced_to_iot: true,
		},
		{
			title: "Réunion de projet annuel",
			user: teacherUser,
			reservedForUser: studentUser,
			classroom: getRoom("Salle C101"),
			created_at: getDayWithTime(-1, 14, 0),
			start_at: getDayWithTime(1, 10, 0),
			end_at: getDayWithTime(1, 12, 0),
			code: null,
			code_generate_at: null,
			is_synced_to_iot: false,
		},
		{
			title: "Session de Révision",
			user: adminUser,
			reservedForUser: studentUser,
			classroom: getRoom("Salle A102"),
			created_at: getDayWithTime(-1, 16, 0),
			start_at: getDayWithTime(1, 15, 0),
			end_at: getDayWithTime(1, 17, 0),
			code: null,
			code_generate_at: null,
			is_synced_to_iot: false,
		},
		{
			title: "Séminaire de rentrée",
			user: adminUser,
			reservedForUser: adminUser,
			classroom: getRoom("Salle A101"),
			created_at: getDayWithTime(-3, 8, 0),
			start_at: getDayWithTime(-1, 9, 0),
			end_at: getDayWithTime(-1, 12, 0),
			code: "9999",
			code_generate_at: getDayWithTime(-1, 8, 30),
			is_synced_to_iot: true,
		},
	];

	const bookings: Booking[] = [];
	for (const data of bookingsData) {
		let booking = await repo.findOne({
			where: {
				classroom: { id: data.classroom.id },
				start_at: data.start_at,
				end_at: data.end_at,
			},
			relations: { user: true, reservedForUser: true, classroom: true },
		});
		if (!booking) {
			booking = repo.create(data);
			await repo.save(booking);
		}
		bookings.push(booking);
	}
	return bookings;
}
