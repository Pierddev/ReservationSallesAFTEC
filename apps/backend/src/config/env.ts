import dotenv from "dotenv";

dotenv.config();

export const env = {
	port: process.env.PORT || 3005,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
	dbPort: Number(process.env.DB_PORT) || 3306,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	jwtSecret: process.env.JWT_SECRET,
	urlSite: process.env.URL_SITE,
};
