import { Request, Response } from 'express';
import { deleteBook, insertBook, updateBook } from '../database/repos/bookrepo';

export type BookWithId = {
    bookId: number
    title: string,
    author: string,
    description: string,
}

export type Book = {
    title: string,
    author: string,
    description: string,
}

export const updateBookData = async (request: Request<{bookId: number}>, response: Response) => {
    
    const data = request.body.data;
    const errorList: string[] = [];

    // also floats go trough but good enough here
    if (isNaN(request.params.bookId)) {
        return response.status(500).send(`Server error`); 
        // This is on purpose. Frontend should never send data without valid Id. With multiuser case this would be different
    } 

    if (data.title === undefined || data.title === ''){
        errorList.push("title");
    }

    if (data.author === undefined || data.author === ''){
        errorList.push("author");
    }
    
    if (errorList.length > 0){
        return response.status(422).send(`Fields can't be empty: ${errorList.toString()}`);
    }

    // TODO: should check if duplicate constrain and give detailed info to user
    const book = {
        bookId: Number(request.params.bookId),
        title: String(data.title),
        author: String(data.author),
        description: String(data.description)
    }
    
    try {
        await updateBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send("Book with same author and title already exists");
    }
}

export const insertBookData = async (request:Request, response: Response) => {
    const data = request.body.data;
    
    const errorList: string[] = [];
    if (data.title === undefined || data.title === ''){
        errorList.push("title");
    }

    if (data.author === undefined || data.author === ''){
        errorList.push("author");
    }

    if (errorList.length > 0){
        return response.status(422).send(`Fields can't be empty: ${errorList.toString()}`);
    }

    // TODO: should check if duplicate constrain and give detailed info to user
    const book = {
        title: String(data.title),
        author: String(data.author),
        description: String(data.description)
    }
    
    try {
        await insertBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send("Book with same name and author has already been added");
    }
}

export const deleteBookData = async (bookId: number, response: Response) => {
    if (isNaN(bookId)) {
        return response.status(500).send(`Server error`); 
        // This is on purpose. Frontend should never send data without valid Id. With multiuser case this would be different
    } 
    try {
        await deleteBook(Number(bookId));
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send();
    }
}
