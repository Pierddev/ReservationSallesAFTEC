import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Building } from "./Building.entity.js";

@Entity({ name: "Floor" })
export class Floor {
	@PrimaryGeneratedColumn({ type: "bigint" })
	id!: number;

	@Column({ type: "int" })
	level!: number;

	@ManyToOne(() => Building, { nullable: false })
	@JoinColumn({ name: "building_id" })
	building!: Building;
}
