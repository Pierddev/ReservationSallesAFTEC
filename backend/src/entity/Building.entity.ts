import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Building" })
export class Building {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	name!: string;
}
