import express from "express";
import { openDb } from "./database/database";

import router from "./routes/routes";

const port = 8000;
const app = express();

migrateDatabase();

app.use(express.json());
app.use(router);



app.listen(port, () => {
    console.log('App is running');
})



async function migrateDatabase() {
    const db = await openDb();
    await db.migrate({
        migrationsPath: "./database/migrations"
    })
    db.close();
}

