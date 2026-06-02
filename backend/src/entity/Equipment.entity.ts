import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Equipment" })
export class Equipment {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "varchar", length: 50 })
	name!: string;
}
