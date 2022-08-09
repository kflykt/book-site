import { BookModel, InsertBookModel } from "../../core/book";
import { openDb } from "../database";



export const getBooks = async () => {
    const db = await openDb();
    const query = "SELECT bookId, title, author, description from Books"; 
    const result = await db.all<BookModel[]>(query);
    db.close();
    return result;    
}


export const updateBook = async (book: BookModel) => {
    const db = await openDb();
    console.log(book);
    const query = `UPDATE Books SET title=?, author=?, description=? WHERE bookId = ?`; 
    await db.run(query, [book.title, book.author, book.description, book.bookId]);
    db.close();
}

export const insertBook = async (book: InsertBookModel) => {
    const db = await openDb();
    const query = `INSERT INTO BOOKS (title, author, description) VALUES (?, ?, ?)`; 
    await db.run(query, [book.title, book.author, book.description]);
    db.close();
}