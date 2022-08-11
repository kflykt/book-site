import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { openDb } from "./database/database";
import router from "./routes/routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

migrateDatabase();

export default app;


async function migrateDatabase() {
    const db = await openDb();
    await db.migrate({
        migrationsPath: "./database/migrations"
    })
    db.close();
}