import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
