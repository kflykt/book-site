import { Request, Response } from 'express';
import { insertBook, updateBook } from '../database/repos/bookrepo';

export type BookModel = {
    bookId: number
    title: string,
    author: string,
    description: string,
}

export type InsertBookModel = {
    title: string,
    author: string,
    description: string,
}

export const updateBookData = async (request: Request, response: Response) => {
    if (request.body.title === undefined || request.body.title === ''){
        return response.status(422).send();
    }

    if (request.body.author === undefined || request.body.author === ''){
        return response.status(422).send();
    }

    const book = {
        bookId: Number(request.params.bookId),
        title: String(request.body.title),
        author: String(request.body.author),
        description: String(request.body.description)
    }
    console.log(request.body, request.params);
    
    try {
        await updateBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send();
    }
}

export const insertBookData = async (request:Request, response: Response) => {
    if (request.body.title === undefined || request.body.title === ''){
        return response.status(422).send();
    }

    if (request.body.author === undefined || request.body.author === ''){
        return response.status(422).send();
    }

    const book = {
        title: String(request.body.title),
        author: String(request.body.author),
        description: String(request.body.description)
    }
    
    try {
        await insertBook(book);
        return response.status(200).send();
    } catch (error) {
        return response.status(500).send();
    }
}

