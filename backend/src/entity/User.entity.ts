import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role.entity.js";

export const HashSalt = 10;

@Entity({ name: "user" })
export class User {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	firstname!: string;

	@Column({ type: "varchar", length: 50 })
	lastname!: string;

	@Column({ type: "varchar", length: 128, unique: true })
	email!: string;

	@Column({ type: "varchar", length: 255 })
	password!: string;

	@ManyToOne(() => Role, { nullable: false })
	@JoinColumn({ name: "role_id" })
	role!: Role;
}
