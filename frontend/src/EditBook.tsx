import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { Dispatch, FC, SetStateAction } from "react"
import toast from "react-hot-toast";
import styled from "styled-components";
import { updateBook, addBook, deleteBook } from "./BooksQuery";
import { Book, BookWithId } from "./types/book";

type EditBookProps = {
    book: BookWithId,
    setBook: Dispatch<SetStateAction<BookWithId>>
}

export const EditBook: FC<EditBookProps> = ({ book, setBook }): JSX.Element => {

    const queryClient = useQueryClient();

    const deleteMutation = useMutation((bookId: number) => { return deleteBook(bookId) }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success("Book deleted");
        },
        onError: (error: AxiosError) => {
            const message = error.response?.data as string ?? error.message
            toast.error(message);
        }
    });
    const updateMutation = useMutation((targetBook: BookWithId) => { return updateBook(targetBook) }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success("Book information updated");
        },
        onError: (error: AxiosError) => {
            const message = error.response?.data as string ?? error.message
            toast.error(message);
        }
    })
    const addMutation = useMutation((targetBook: Book) => { return addBook(targetBook) }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['books'])
            toast.success("New book added");
        },
        onError: (error: AxiosError) => {
            const message = error.response?.data as string ?? error.message
            toast.error(message);
        }
    })
   
    
    const handleSaveNew = () => {
        addMutation.mutate(book);
        handleClear();
    }

    const handleSave = () => {
        updateMutation.mutate(book);
        handleClear();
    }

    const handleClear = () => {
        setBook({title: "", author: "", description: "", bookId: -1});
    }

    const handleDelete = () => {
        if(book.bookId !== -1){
            deleteMutation.mutate(book.bookId);
            handleClear();
        } else {
            toast.error("Can't delete book that doesn't exists in system");
        }
    }

    const isDisabled = (saveNew: boolean) => {
        if(book.title === "" || book.author === ""){
            return true;
        }

        if(!saveNew && book.bookId > -1){
            return false;
        }

        if(saveNew && book.bookId === -1){
            return false;
        }
        return true
    }

    const handleValueChange = (value: string, inputType: string) => {
        if(inputType === 'title'){ 
            setBook({title: value, author: book.author, description: book.description, bookId: book.bookId});
        }
        if(inputType === 'author'){ 
            setBook({title: book.title, author: value, description: book.description, bookId: book.bookId});
        }
        if(inputType === 'description'){ 
            setBook({title: book.title, author: book.author, description: value, bookId: book.bookId});
        }
    }

    return (
        <EditContainer>
            <InputContainer>
                <StyledInputHeader>Title</StyledInputHeader>
                <StyledInput title="title" value={book.title} onChange={(e) => handleValueChange(e.target.value, 'title')} />
                <StyledInputHeader>Author</StyledInputHeader>
                <StyledInput title="author" value={book.author} onChange={(e) => handleValueChange(e.target.value, 'author')} />
                <StyledInputHeader>Description</StyledInputHeader>
                <StyledTextArea title="description" value={book.description} onChange={(e) => handleValueChange(e.target.value, 'description')} />
            </InputContainer>
            <ButtonContainer>
                <SuccessButton title="savenew" onClick={handleSaveNew} disabled={isDisabled(true)}>Save new</SuccessButton>
                <SuccessButton title="save" onClick={handleSave} disabled={isDisabled(false)}>Save</SuccessButton>
                <ClearButton onClick={handleClear}>Clear</ClearButton>
                <DeleteButton title="delete" onClick={handleDelete} disabled={isDisabled(false)}>Delete</DeleteButton>
            </ButtonContainer>
        </EditContainer>
    )
}

const minInputWithd = '300px';

const StyledInputHeader = styled.h3`
    margin: 15px 15px 0px 15px;
    display: flex;
    align-self: center;
`;

// Input Styles
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const StyledInput = styled.input`
    margin: 0px 15px 15px 15px;
    padding: 5px;
    display: flex;
    min-width: ${minInputWithd};
    align-self: center;
`;

const StyledTextArea = styled.textarea`
    display: flex;
    margin: 0px 15px 15px 15px;
    min-width: ${minInputWithd};
    align-self: center;
`;


// Button styles

const ButtonContainer = styled.div`
    display: flex;
    align-self: center;
    align-content: space-between;

`;


const StyledButton = styled.button`
    margin: 15px;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    display: flex;
    flext-wrap: wrap;

    &:disabled {
        opacity: 0.6;
    }
`;

const SuccessButton = styled(StyledButton)`
    background-color: #4CAF50;
`;

const DeleteButton = styled(StyledButton)`
    background-color: #f44336;
`;

const ClearButton = styled(StyledButton)`
    background-color: #e7e7e7;
    color: black;
`;

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
