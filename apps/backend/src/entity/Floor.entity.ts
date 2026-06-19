import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Building } from "./Building.entity.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Floor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de l'étage
 *         level:
 *           type: integer
 *           description: Le numéro de l'étage
 */
@Entity({ name: "floor" })
export class Floor {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "int" })
	level!: number;

	@ManyToOne(() => Building, { nullable: false })
	@JoinColumn({ name: "building_id" })
	building!: Building;
}
