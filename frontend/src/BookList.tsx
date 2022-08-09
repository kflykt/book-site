import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Book } from "../../backend/database/repos/bookrepo";
import { EditBook } from "./editBook";
import { getBooks } from "./getBooks";

export const BookList = () => {

    const { data } = useQuery(['books'], getBooks);
    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined)

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



