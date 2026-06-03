import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class Role {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 30, unique: true })
	name!: string;
}
