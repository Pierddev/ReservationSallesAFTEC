import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du rôle
 *         name:
 *           type: string
 *           description: Le nom du rôle
 */
@Entity({ name: "role" })
export class Role {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 30, unique: true })
	name!: string;

	@OneToMany(
		() => User,
		(user) => user.role,
	)
	users!: User[];
}
