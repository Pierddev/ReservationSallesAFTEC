import express from "express"
import cors from "cors";
import { env } from "./config/env.js"
import routes from "./routes/index.js";

const app = express()
const port = env.port

app.use(
	cors({
		origin: env.urlSite,
		credentials: true,
	})
)

app.use("/", routes)

// BDD connexion and server start
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});