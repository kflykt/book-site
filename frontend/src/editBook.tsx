import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react"
import toast from "react-hot-toast";
import styled from "styled-components";
import { updateBook, addBook, deleteBook } from "./BooksQuery";
import { Book, BookWithId } from "./types/book";

type EditBookProps = {
    book: BookWithId | undefined
}

export const EditBook: FC<EditBookProps> = ({ book }): JSX.Element => {

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
   
    const [editBookId, setEditBookId] = useState<number>(-1);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editAuthor, setEditAuthor] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");

    useEffect(() => {
        setEditBookId(book?.bookId ?? -1);
        setEditTitle(book?.title ?? "");
        setEditAuthor(book?.author ?? "");
        setEditDescription(book?.description ?? "");
    }, [book])
    
    const handleSaveNew = () => {
        const book: Book = {
            title: editTitle,
            author: editAuthor,
            description: editDescription
        }
        addMutation.mutate(book);
    }

    const handleSave = () => {
        const book: BookWithId = {
            bookId: editBookId,
            title: editTitle,
            author: editAuthor,
            description: editDescription
        }
        updateMutation.mutate(book);
    }

    const handleClear = () => {
        setEditBookId(-1);
        setEditTitle("");
        setEditAuthor("");
        setEditDescription("");
    }

    const handleDelete = () => {
        if(editBookId !== -1){
            deleteMutation.mutate(editBookId);
            handleClear();
        } else {
            toast.error("Can't delete book that doesn't exists in system");
        }
    }

    const isDisabled = (saveNew: boolean) => {
        if(editTitle === "" || editAuthor === ""){
            return true;
        }

        if(!saveNew && editBookId > -1){
            return false;
        }

        if(saveNew && editBookId === -1){
            return false;
        }
        return true
    }

    return (
        <EditContainer>
            <InputContainer>
                <StyledInputHeader>Title</StyledInputHeader>
                <StyledInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <StyledInputHeader>Author</StyledInputHeader>
                <StyledInput value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
                <StyledInputHeader>Description</StyledInputHeader>
                <StyledTextArea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            </InputContainer>
            <ButtonContainer>
                <SuccessButton onClick={handleSaveNew} disabled={isDisabled(true)}>Save new</SuccessButton>
                <SuccessButton onClick={handleSave} disabled={isDisabled(false)}>Save</SuccessButton>
                <ClearButton onClick={handleClear}>Clear</ClearButton>
                <DeleteButton onClick={handleDelete} disabled={isDisabled(false)}>Delete</DeleteButton>
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
