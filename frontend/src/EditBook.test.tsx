import { render, screen } from "@testing-library/react";
import { BookWithId } from "./types/book";
import { EditBook } from "./EditBook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

it('Display book information at input fields, Save button is enabled and delete button is enabled', () => {
    const book: BookWithId = {title: "test title", author: "mock author", description: "some description", bookId: 1};
    const setBook = () => {};    
    render(
        <QueryClientProvider client={queryClient}>
            <EditBook book={book} setBook={setBook}/>
        </QueryClientProvider>
    );
    const titleInput = screen.getByTitle('title');
    expect(titleInput).toHaveValue("test title")

    const authorInput = screen.getByTitle('author');
    expect(authorInput).toHaveValue("mock author")

    const descriptionInput = screen.getByTitle('description');
    expect(descriptionInput).toHaveValue("some description")

    const saveButton = screen.getByText('Save');
    expect(saveButton.closest("button")).not.toBeDisabled()

    const saveNewButton = screen.getByText('Save new');
    expect(saveNewButton.closest("button")).toBeDisabled()

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest("button")).not.toBeDisabled()

});


it('Display new book information and save new is enabled', () => {
    const book: BookWithId = {title: "test title", author: "mock author", description: "some description", bookId: -1};
    const setBook = () => {}; 
    render(
        <QueryClientProvider client={queryClient}>
            <EditBook book={book} setBook={setBook}/>
        </QueryClientProvider>
    );
    const titleInput = screen.getByTitle('title');
    expect(titleInput).toHaveValue("test title")

    const authorInput = screen.getByTitle('author');
    expect(authorInput).toHaveValue("mock author")

    const descriptionInput = screen.getByTitle('description');
    expect(descriptionInput).toHaveValue("some description")

    const saveButton = screen.getByText('Save');
    expect(saveButton.closest("button")).toBeDisabled()

    const saveNewButton = screen.getByText('Save new');
    expect(saveNewButton.closest("button")).not.toBeDisabled()

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest("button")).toBeDisabled()

});


it('Only title given. All action buttons are disabled', () => {
    const book: BookWithId = {title: "test title", author: "", description: "", bookId: -1};
    const setBook = () => {}; 
    render(
        <QueryClientProvider client={queryClient}>
            <EditBook book={book} setBook={setBook}/>
        </QueryClientProvider>
    );
    const titleInput = screen.getByTitle('title');
    expect(titleInput).toHaveValue("test title")

    const authorInput = screen.getByTitle('author');
    expect(authorInput).toHaveValue("")

    const descriptionInput = screen.getByTitle('description');
    expect(descriptionInput).toHaveValue("")

    const saveButton = screen.getByText('Save');
    expect(saveButton.closest("button")).toBeDisabled()

    const saveNewButton = screen.getByText('Save new');
    expect(saveNewButton.closest("button")).toBeDisabled()

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest("button")).toBeDisabled()

});

it('Only author given. All action buttons are disabled', () => {
    const book: BookWithId = {title: "", author: "new author", description: "", bookId: -1};
    const setBook = () => {}; 
    render(
        <QueryClientProvider client={queryClient}>
            <EditBook book={book} setBook={setBook}/>
        </QueryClientProvider>
    );
    const titleInput = screen.getByTitle('title');
    expect(titleInput).toHaveValue("")

    const authorInput = screen.getByTitle('author');
    expect(authorInput).toHaveValue("new author")

    const descriptionInput = screen.getByTitle('description');
    expect(descriptionInput).toHaveValue("")

    const saveButton = screen.getByText('Save');
    expect(saveButton.closest("button")).toBeDisabled()

    const saveNewButton = screen.getByText('Save new');
    expect(saveNewButton.closest("button")).toBeDisabled()

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton.closest("button")).toBeDisabled()

});