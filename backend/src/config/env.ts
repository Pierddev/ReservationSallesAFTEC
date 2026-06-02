import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 3005,
	jwtSecret: process.env.JWT_SECRET,
	urlSite: process.env.URL_SITE,
}