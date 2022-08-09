import { useMutation } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react"
import { Book, BookWithId } from "../../backend/core/book";
import { updateBook, addBook } from "./BooksQuery";

type EditBookProps = {
    book: BookWithId | undefined
}

export const EditBook: FC<EditBookProps> = ({ book }): JSX.Element => {

    const updateMutation = useMutation((targetBook: BookWithId) => { return updateBook(targetBook) })
    const addMutation = useMutation((targetBook: Book) => { return addBook(targetBook) })
   
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

    const handleCancel = () => {
        setEditBookId(-1);
        setEditTitle("");
        setEditAuthor("");
        setEditDescription("");
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
            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></input>
            <button onClick={handleSaveNew} disabled={isDisabled(true)}>Save new</button>
            <button onClick={handleSave} disabled={isDisabled(false)}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}