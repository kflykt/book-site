import { Database } from "sqlite3";
import { open } from "sqlite";


export const openDb = () => {

    const database = "./database/" + 'BookDB.sqlite';

    return open({
        filename: database,
        driver: Database
    })
}



