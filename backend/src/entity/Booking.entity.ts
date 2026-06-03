import {
	Check,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Classroom } from "./Classroom.entity.js";
import { User } from "./User.entity.js";

@Check("end_at > start_at")
@Entity({ name: "booking" })
export class Booking {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 100 })
	title!: string;

	@ManyToOne(() => User, { nullable: false })
	@JoinColumn({ name: "user_id" })
	user!: User;

	@ManyToOne(() => User, { nullable: false })
	@JoinColumn({ name: "reserved_for_user_id" })
	reservedForUser!: User;

	@Index("idx_Booking_classroom_id")
	@ManyToOne(() => Classroom, { nullable: false })
	@JoinColumn({ name: "classroom_id" })
	classroom!: Classroom;

	@Column({ type: "datetime" })
	created_at!: Date;

	@Index("idx_Booking_start_at")
	@Column({ type: "datetime" })
	start_at!: Date;

	@Index("idx_Booking_end_at")
	@Column({ type: "datetime" })
	end_at!: Date;

	@Column({ type: "varchar", length: 4, nullable: true })
	code!: string | null;

	@Column({ type: "datetime", nullable: true })
	code_generate_at!: Date | null;

	@Column({ type: "boolean", default: false })
	is_synced_to_iot!: boolean;
}
