import axios from "axios"
import { Book, BookWithId } from "./types/book";

const urlPrefix = 'http://localhost:8000'

const headers = {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
}


export const getBooks = (): Promise<BookWithId[]> => {

    return axios.get<BookWithId[]>(urlPrefix + "/books",
        {
            headers: headers
        }
    )
    .then(response => response.data);
}

export const updateBook = (book: BookWithId) => {

    return axios.post(urlPrefix + "/books/" + book.bookId, {
        headers: headers,    
        data: {title: book.title, author: book.author, description: book.description}
    })
}

export const addBook = (book: Book) => {
    headers['content-type'] = 'application/x-www-form-urlencoded';

    return axios.post(urlPrefix + "/books", {
        headers: headers,    
        data: book
    })
}

export const deleteBook = (bookId: number) => {
    headers['content-type'] = 'application/x-www-form-urlencoded';

    return axios.delete(urlPrefix + "/books/" + bookId, {
        headers: headers
    })
}
