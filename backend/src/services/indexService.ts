import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppDataSource } from "../database/data-source.js";
import type { createUserDto } from "../dtos/createUser.dto.js";
import type { loginUserDto } from "../dtos/loginUser.dto.js";
import { Role } from "../entity/Role.entity.js";
import { HashSalt, User } from "../entity/User.entity.js";

export class IndexService {
	async register(dto: createUserDto) {
		const userRepository = AppDataSource.getRepository(User);
		const roleRepository = AppDataSource.getRepository(Role);

		// Check if user already exists
		const existingUser = await userRepository.findOneBy({ email: dto.email });
		if (existingUser) {
			throw new Error("User already exists");
		}

		// Add role to user --> default role is "student"
		const defaultRole = await roleRepository.findOneBy({ name: "student" });
		if (!defaultRole) {
			throw new Error("Default role not found");
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(dto.password, HashSalt);

		// Create user
		const user = userRepository.create({
			firstname: dto.firstname,
			lastname: dto.lastname,
			email: dto.email,
			password: hashedPassword,
			role: defaultRole,
		});

		return await userRepository.save(user);
	}

	async login(dto: loginUserDto) {
		const userRepository = AppDataSource.getRepository(User);

		// Check if user exists with role (we need the role to generate the token)
		const user = await userRepository.findOne({
			where: { email: dto.email },
			relations: { role: true },
		});

		if (!user) {
			throw new Error("User not found");
		}

		// Compare password
		const isPasswordValid = await bcrypt.compare(dto.password, user.password);
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		// Generate token
		const token = jwt.sign(
			{
				userId: user.id,
				role: user.role.name,
			},
			`${env.jwtSecret}`,
			{ expiresIn: "1h" },
		);

		// Return token
		return { token, user };
	}
}
