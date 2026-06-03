import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Floor } from "./Floor.entity.js";

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
