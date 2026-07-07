import { AppDataSource } from "../database/data-source.js"
import { User } from "../entity/User.entity.js"

export class UserService {
    async getAll(): Promise<User[]> {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }
}