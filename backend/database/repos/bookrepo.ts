import { openDb } from "../database";
export type Book = {
    title: string,
    author: string,
    description: string,
}


export const getBooks = async () => {
    const db = await openDb();
    const query = "SELECT title, author, description from Books"; 
    const result = await db.all<Book[]>(query);
    db.close();
    return result;    
}