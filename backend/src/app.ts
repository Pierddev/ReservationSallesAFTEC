import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { AppDataSource } from "./database/data-source.js";
import routes from "./routes/index.js";
import { setupSwagger } from "./swagger/swagger.js";

const app = express();
const port = env.port;

app.use(
	cors({
		origin: env.urlSite,
		credentials: true,
	}),
);

app.use(cookieParser());
app.use(express.json());

// Swagger
setupSwagger(app);

app.use("/", routes);

// BDD connexion and server start
AppDataSource.initialize()
	.then(() => {
		console.log("Connexion à la BDD réussie");
		app.listen(port, () => {
			console.log(`Serveur démarré sur http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.error("Erreur lors de la connexion à la BDD :", error);
	});
