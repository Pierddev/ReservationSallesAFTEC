import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity.js";

@Entity({ name: "log" })
export class Log {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 255 })
	remote_host!: string;

	@ManyToOne(() => User, { nullable: true })
	@JoinColumn({ name: "user_id" })
	user!: User | null;

	@Index("idx_Log_created_at")
	@Column({ type: "datetime" })
	created_at!: Date;

	@Column({ type: "varchar", length: 500 })
	request_line!: string;

	@Column({ type: "int" })
	http_status!: number;

	@Column({ type: "bigint" })
	bytes!: number;
}
