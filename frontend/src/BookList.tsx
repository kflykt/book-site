import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BookWithId } from "../../backend/core/book";
import { EditBook } from "./editBook";
import { getBooks } from "./BooksQuery";

export const BookList = () => {

    const { data } = useQuery(['books'], getBooks);
    const [selectedBook, setSelectedBook] = useState<BookWithId | undefined>(undefined)

    const bookList = data !== undefined ? data : [];


    const bookElementList = () => {
        return (
            <>
                { bookList.map((book, index) =>
                    <tr onClick={ () => setSelectedBook(book) } key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                    </tr>
                )
                }
            </>
        );   
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Authors</th>
                    </tr>
                </thead>
                <tbody>
                    {bookElementList()}
                </tbody>
            </table>
            <EditBook book={selectedBook}/>
        </>
    )
}



