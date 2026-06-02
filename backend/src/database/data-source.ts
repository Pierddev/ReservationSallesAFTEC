import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "mariadb",
	host: "localhost",
	port: 3306,
	username: "reservation_salles_app",
	password: "admin1234",
	database: "reservation_salles_aftec",
	entities: ["src/entity/*.ts"],
	migrations: ["src/migrations/*.ts"],
	synchronize: false,
	logging: true,
});
