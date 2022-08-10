import { BookWithId, Book } from "../../core/book";
import { openDb } from "../database";

export const getBooks = async () => {
    const db = await openDb();
    const query = "SELECT bookId, title, author, description from Books"; 
    const result = await db.all<BookWithId[]>(query);
    db.close();
    return result;    
}


export const updateBook = async (book: BookWithId) => {
    const db = await openDb();
    console.log(book);
    const query = `UPDATE Books SET title=?, author=?, description=? WHERE bookId = ?`; 
    await db.run(query, [book.title, book.author, book.description, book.bookId]);
    db.close();
}

export const insertBook = async (book: Book) => {
    const db = await openDb();
    const query = `INSERT INTO BOOKS (title, author, description) VALUES (?, ?, ?)`; 
    await db.run(query, [book.title, book.author, book.description]);
    db.close();
}

export const deleteBook = async (bookId: number) => {
    const db = await openDb();
    const query = `DELETE FROM BOOKS WHERE bookId = ?`; 
    await db.run(query, [bookId]);
    db.close();
}