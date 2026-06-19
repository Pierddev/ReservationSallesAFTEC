import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de l'équipement
 *         name:
 *           type: string
 *           description: Le nom de l'équipement
 */
@Entity({ name: "equipment" })
export class Equipment {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	name!: string;
}
