import app from "./app";
import { openDb } from "./database/database";

const port = 8000;



migrateDatabase();

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

