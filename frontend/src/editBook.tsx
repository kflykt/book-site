import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { FC, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Book, BookWithId } from "../../backend/core/book";
import { updateBook, addBook, deleteBook } from "./BooksQuery";

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
        <>
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
            <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)}></input>
            <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></textarea>
            <button onClick={handleSaveNew} disabled={isDisabled(true)}>Save new</button>
            <button onClick={handleSave} disabled={isDisabled(false)}>Save</button>
            <button onClick={handleClear}>clear</button>
            <button onClick={handleDelete}disabled={isDisabled(false)}>Delete</button>
        </>
    )
}
