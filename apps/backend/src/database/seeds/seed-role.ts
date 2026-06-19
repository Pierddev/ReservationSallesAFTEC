import type { DataSource } from "typeorm";
import { Role } from "../../entity/Role.entity.js";

export async function seedRoles(dataSource: DataSource): Promise<Role[]> {
	const repo = dataSource.getRepository(Role);
	const roleNames = ["student", "teacher", "admin"];
	const roles: Role[] = [];

	for (const name of roleNames) {
		let role = await repo.findOne({ where: { name } });
		if (!role) {
			role = repo.create({ name });
			await repo.save(role);
		}
		roles.push(role);
	}

	return roles;
}
