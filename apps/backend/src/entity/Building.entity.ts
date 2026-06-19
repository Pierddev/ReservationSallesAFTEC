import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @swagger
 * components:
 *   schemas:
 *     Building:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du bâtiment
 *         name:
 *           type: string
 *           description: Le nom du bâtiment
 */
@Entity({ name: "building" })
export class Building {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	name!: string;
}
