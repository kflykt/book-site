import { openDb } from "../database";
export type Book = {
    title: string,
    author: string
}


export const getBooks = async () => {
    const db = await openDb();
    const query = "SELECT title, author from Books"; 
    const result = await db.all<Book[]>(query);
    db.close();
    return result;    
}