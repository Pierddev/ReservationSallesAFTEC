import {
	Check,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./Classroom.entity.js";
import { Equipment } from "./Equipment.entity.js";

@Check("end_at > start_at")
@Entity({ name: "classroom_equipment" })
export class ClassroomEquipment {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@ManyToOne(() => Classroom, { nullable: false })
	@JoinColumn({ name: "classroom_id" })
	classroom!: Classroom;

	@ManyToOne(() => Equipment, { nullable: false })
	@JoinColumn({ name: "equipment_id" })
	equipment!: Equipment;

	@Column({ type: "datetime", nullable: true })
	start_at!: Date | null;

	@Column({ type: "datetime", nullable: true })
	end_at!: Date | null;
}
