import { Booking } from "../../entity/Booking.entity.js";
import { Building } from "../../entity/Building.entity.js";
import { Classroom } from "../../entity/Classroom.entity.js";
import { ClassroomDisablement } from "../../entity/ClassroomDisablement.entity.js";
import { ClassroomEquipment } from "../../entity/ClassroomEquipment.entity.js";
import { Equipment } from "../../entity/Equipment.entity.js";
import { Floor } from "../../entity/Floor.entity.js";
import { Role } from "../../entity/Role.entity.js";
import { User } from "../../entity/User.entity.js";
import { AppDataSource } from "../data-source.js";
import { seedBookings } from "./seed-booking.js";
import { seedBuildings } from "./seed-building.js";
import { seedClassrooms } from "./seed-classroom.js";
import { seedClassroomDisablements } from "./seed-classroom-disablement.js";
import { seedClassroomEquipments } from "./seed-classroom-equipment.js";
import { seedEquipments } from "./seed-equipment.js";
import { seedFloors } from "./seed-floor.js";
import { seedRoles } from "./seed-role.js";
import { seedUsers } from "./seed-user.js";

export async function seed(clearDb = false) {
	try {
		// DB connection
		console.log("Connection to the Database...");
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
		}
		console.log("Connection to the Database successful");

		if (clearDb) {
			// DB clear
			console.log("Clean up database...");
			// Get repositories
			const bookingRepository = AppDataSource.getRepository(Booking);
			await bookingRepository.createQueryBuilder().delete().execute();

			const classroomDisablementRepository =
				AppDataSource.getRepository(ClassroomDisablement);
			await classroomDisablementRepository
				.createQueryBuilder()
				.delete()
				.execute();

			const classroomEquipmentRepository =
				AppDataSource.getRepository(ClassroomEquipment);
			await classroomEquipmentRepository
				.createQueryBuilder()
				.delete()
				.execute();

			const userRepository = AppDataSource.getRepository(User);
			await userRepository.createQueryBuilder().delete().execute();

			const classroomRepository = AppDataSource.getRepository(Classroom);
			// Rompre l'auto-référence (parentClassroom) pour éviter les erreurs de clé étrangère lors de la suppression
			await classroomRepository
				.createQueryBuilder()
				.update()
				.set({ parentClassroom: null })
				.execute();
			await classroomRepository.createQueryBuilder().delete().execute();

			const floorRepository = AppDataSource.getRepository(Floor);
			await floorRepository.createQueryBuilder().delete().execute();

			const roleRepository = AppDataSource.getRepository(Role);
			await roleRepository.createQueryBuilder().delete().execute();

			const equipmentRepository = AppDataSource.getRepository(Equipment);
			await equipmentRepository.createQueryBuilder().delete().execute();

			const buildingRepository = AppDataSource.getRepository(Building);
			await buildingRepository.createQueryBuilder().delete().execute();

			console.log("Database cleaned successfully");
		} else {
			console.log("Skipping database clean up (incremental seeding)");
		}

		// Buldings creation
		console.log("Creating buildings...");
		const buildings = await seedBuildings(AppDataSource);
		console.log("Buildings saved successfully");

		// Equipments creation
		console.log("Creating equipements...");
		const _equipements = await seedEquipments(AppDataSource);
		console.log("Equipments saved successfully");

		// Roles creation
		console.log("Creating roles...");
		const roles = await seedRoles(AppDataSource);
		console.log("Roles saved successfully");

		// Floors creation
		console.log("Creating floors...");
		const floors = await seedFloors(AppDataSource, buildings);
		console.log("Floors saved successfully");

		// Classrooms creation
		console.log("Creating classrooms...");
		const classrooms = await seedClassrooms(AppDataSource, floors);
		console.log("Classrooms saved successfully");

		// Classroom disablements creation
		console.log("Creating classroom disablements...");
		await seedClassroomDisablements(AppDataSource, classrooms);
		console.log("Classroom disablements saved successfully");

		// Classroom equipments creation
		console.log("Creating classroom equipments...");
		await seedClassroomEquipments(AppDataSource, _equipements, classrooms);
		console.log("Classroom equipments saved successfully");

		// Users creation
		console.log("Creating users...");
		const users = await seedUsers(AppDataSource, roles);
		console.log("Users saved successfully");

		// Bookings creation
		console.log("Creating bookings...");
		await seedBookings(AppDataSource, classrooms, users);
		console.log("Bookings saved successfully");

		console.log("Seed terminé avec succès !");
	} catch (error) {
		console.error("Erreur lors du seed :", error);
	} finally {
		if (AppDataSource.isInitialized) {
			await AppDataSource.destroy();
		}
		console.log("Connexion fermée.");
	}
}

// Si le fichier exécuté n'est pas le script de dev, on lance le seed normal
const isDevScript = process.argv[1]?.includes("seeders-dev");
if (!isDevScript) {
	seed(false);
}
