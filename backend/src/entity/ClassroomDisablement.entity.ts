import {
	Check,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./Classroom.entity.js";

@Check("end_at > start_at")
@Entity({ name: "Classroom_Disablement" })
export class ClassroomDisablement {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@ManyToOne(() => Classroom, { nullable: false })
	@JoinColumn({ name: "classroom_id" })
	classroom!: Classroom;

	@Column({ type: "datetime" })
	start_at!: Date;

	@Column({ type: "datetime" })
	end_at!: Date;

	@Column({ type: "varchar", length: 255, nullable: true })
	reason!: string | null;
}
