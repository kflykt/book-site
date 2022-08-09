import React, { FC, useEffect, useState } from "react"
import { Book } from "../../backend/database/repos/bookrepo"

type EditBookProps = {
    book: Book | undefined
}

export const EditBook: FC<EditBookProps> = ({ book }): JSX.Element => {


   
    const [editTitle, setEditTitle] = useState<string>("");
    const [editAuthor, setEditAuthor] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");

    useEffect(() => {
        setEditTitle(book?.title ?? "");
        setEditAuthor(book?.author ?? "");
        setEditDescription(book?.description ?? "");
    }, [book])
    
    const handleSaveNew = () => {

    }

    const handleSave = () => {

    }

    const handleCancel = () => {
        setEditTitle("");
        setEditAuthor("");
        setEditDescription("");
    }


    return (
        <>
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}></input>
            <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)}></input>
            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)}></input>
            <button onClick={handleSaveNew}>Save new</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}