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
    if (request.body.title === undefined || request.body.title === ''){
        return response.status(422).send(`title can't be empty`);
    }

    if (request.body.author === undefined || request.body.author === ''){
        return response.status(422).send(`author can't be empty`);
    }

    if (!isNumber(request.params.bookId)) {
        return response.status(500).send(`Server error`); 
        // This is on purpose. Frontend should never send data without valid Id. With multiuser case this would be different
    }  

    // TODO: should check if duplicate constrain and give detailed info to user
    const book = {
        bookId: request.params.bookId,
        title: String(request.body.title),
        author: String(request.body.author),
        description: String(request.body.description)
    }
    
    try {
        await updateBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send("Book with same author and title already exists");
    }
}

export const insertBookData = async (request:Request, response: Response) => {
    if (request.body.title === undefined || request.body.title === ''){
        return response.status(422).send(`title can't be empty`);
    }

    if (request.body.author === undefined || request.body.author === ''){
        return response.status(422).send(`author can't be empty`);
    }

    // TODO: should check if duplicate constrain and give detailed info to user
    const book = {
        title: String(request.body.title),
        author: String(request.body.author),
        description: String(request.body.description)
    }
    
    try {
        await insertBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send({'message': "Book with same name and author has already been added"});
    }
}

export const deleteBookData = async (bookId: number, response: Response) => {
    try {
        await deleteBook(bookId);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send(JSON.stringify(error));
    }
}


const isNumber = (object: any): object is {value: number} =>  {
    return object.value !== undefined;
}
