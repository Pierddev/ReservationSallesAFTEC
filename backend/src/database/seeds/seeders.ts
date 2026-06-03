import { fakerFR as faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { Role } from "../../entity/Role.entity.js";
import { HashSalt, User } from "../../entity/User.entity.js";
import { AppDataSource } from "../data-source.js";

async function seed() {
	try {
		// DB connection
		console.log("Connection to the Database...");
		await AppDataSource.initialize();
		console.log("Connection to the Database successful");

		// Get repositories
		const roleRepository = AppDataSource.getRepository(Role);
		const userRepository = AppDataSource.getRepository(User);

		// DB clear
		console.log("Clean up database...");
		await userRepository.createQueryBuilder().delete().execute();
		await roleRepository.createQueryBuilder().delete().execute();
		console.log("Database cleaned successfully");

		// Roles creation
		console.log("Creating roles...");
		const studentRole = await roleRepository.create({ name: "student" });
		const teacherRole = await roleRepository.create({ name: "teacher" });
		const adminRole = await roleRepository.create({ name: "admin" });

		// Save roles in DB
		await roleRepository.save([studentRole, teacherRole, adminRole]);
		console.log("Roles saved successfully");

		// Users creation
		console.log("Creating users...");

		faker.seed(3);

		const hashedPassword = await bcrypt.hash("Password123!", HashSalt);

		const adminUser = userRepository.create({
			firstname: faker.person.firstName(),
			lastname: faker.person.lastName(),
			email: faker.internet.email(),
			password: hashedPassword,
			role: adminRole,
		});

		const teacherUser = userRepository.create({
			firstname: faker.person.firstName(),
			lastname: faker.person.lastName(),
			email: faker.internet.email(),
			password: hashedPassword,
			role: teacherRole,
		});

		const studentUser = userRepository.create({
			firstname: faker.person.firstName(),
			lastname: faker.person.lastName(),
			email: faker.internet.email(),
			password: hashedPassword,
			role: studentRole,
		});

		await userRepository.save([adminUser, teacherUser, studentUser]);
		console.log("Users created successfully");
	} catch (error) {
		console.error("Error while seeding database: ", error);
	} finally {
		await AppDataSource.destroy();
		console.log("Connexion closed.");
	}
}

seed();
