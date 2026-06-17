import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Floor } from "./Floor.entity.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Classroom:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de la salle
 *         name:
 *           type: string
 *           description: Le nom de la salle
 *         capacity:
 *           type: integer
 *           description: La capacité de la salle
 */
@Entity({ name: "classroom" })
export class Classroom {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	name!: string;

	@Column({ type: "int" })
	capacity!: number;

	@ManyToOne(() => Classroom, { nullable: true })
	@JoinColumn({ name: "parent_classroom_id" })
	parentClassroom!: Classroom | null;

	@OneToMany(
		() => Classroom,
		(classroom) => classroom.parentClassroom,
	)
	childClassrooms!: Classroom[];

	@ManyToOne(() => Floor, { nullable: false })
	@JoinColumn({ name: "floor_id" })
	floor!: Floor;
}
