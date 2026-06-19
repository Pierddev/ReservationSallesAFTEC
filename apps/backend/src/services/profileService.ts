import { AppDataSource } from "../database/data-source.js";
import { User } from "../entity/User.entity.js";

// Service for managing the user profile
export class ProfileService {
	// Get a user's profile by their ID
	async getProfile(userId: number) {
		const userRepository = AppDataSource.getRepository(User);

		// Fetch the user with their role relation (needed to get role.id and role.name)
		const user = await userRepository.findOne({
			where: { id: userId },
			relations: { role: true },
		});

		if (!user) throw new Error("User not found");

		return user;
	}
}
