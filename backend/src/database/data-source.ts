import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env.js";

export const AppDataSource = new DataSource({
	type: "mariadb",
	host: `${env.dbHost}`,
	port: Number(env.dbPort),
	username: `${env.dbUser}`,
	password: `${env.dbPassword}`,
	database: `${env.dbName}`,
	entities: ["src/entity/*.ts"],
	migrations: ["src/migrations/*.ts"],
	synchronize: false,
	logging: true,
});
