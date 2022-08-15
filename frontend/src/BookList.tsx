import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBooks } from "./BooksQuery";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { BookWithId } from "./types/book";
import { EditBook } from "./EditBook";

export const BookList = () => {

    const { data, error } = useQuery<BookWithId[], AxiosError>(['books'], getBooks);
    

    const [selectedBook, setSelectedBook] = useState<BookWithId>({title: "", author: "", description: "", bookId: -1})

    const bookList = data !== undefined ? data : [];


    if (error){
        toast.error(error.message);
    }


    const bookElementList = () => {
        return (
            <>
                { bookList.map((book, index) =>
                    <tr key={index}>
                        <StyledTableCell onClick={ () => setSelectedBook(book) }>{book.title}</StyledTableCell>
                        <StyledTableCell onClick={ () => setSelectedBook(book) }>{book.author}</StyledTableCell>
                    </tr>
                )
                }
            </>
        );   
    }

    return (
        <>
            <CenteredTable>
                <StyledHeader>
                    <StyledHeaderRow>
                        <StyledTableHeaderCell>Title</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Authors</StyledTableHeaderCell>
                    </StyledHeaderRow>
                </StyledHeader>
                <tbody>
                    {bookElementList()}
                </tbody>
            </CenteredTable>
            <EditBook book={selectedBook} setBook={setSelectedBook}/>
            <Toaster   position="top-center" reverseOrder={false} />
        </>
    )
}


const CenteredTable = styled.table`
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const StyledHeader = styled.thead`
    background-color: #009879;
    color: #ffffff;
    text-align: left;
`;

const StyledHeaderRow = styled.tr`
    background-color: #009879;
    color: #ffffff;
    text-align: left;
`;

const StyledTableHeaderCell = styled.th`
    padding: 10px;
    border: 1px solid black;
`;

const StyledTableCell = styled.td`
    padding: 10px;
    border: 1px solid black;
`;




