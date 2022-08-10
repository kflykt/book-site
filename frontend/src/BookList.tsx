import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BookWithId } from "../../backend/core/book";
import { EditBook } from "./editBook";
import { getBooks } from "./BooksQuery";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

export const BookList = () => {

    const { data, error } = useQuery<BookWithId[], AxiosError>(['books'], getBooks);
    

    const [selectedBook, setSelectedBook] = useState<BookWithId | undefined>(undefined)

    const bookList = data !== undefined ? data : [];

    if (error){
        toast.error(error.message);
    }


    const bookElementList = () => {
        return (
            <>
                { bookList.map((book, index) =>
                    <tr key={index}>
                        <td onClick={ () => setSelectedBook(book) }>{book.title}</td>
                        <td onClick={ () => setSelectedBook(book) }>{book.author}</td>
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
            <Toaster   position="top-center" reverseOrder={false} />
        </>
    )
}



