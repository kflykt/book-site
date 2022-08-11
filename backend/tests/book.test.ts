import request from 'supertest'
import app from '../'
import { BookWithId } from '../core/book';
import { openDb } from '../database/database';

describe("Post /books/:bookId", () => {

    it("No form data. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/5")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
        expect(response.text).toBe(`Fields can't be empty: title,author`)
    })

    it("No title given. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/5")
            .send({data: {title: '', author: 'test', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    it("No author given. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/5")
            .send({data: {title: 'some title', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    it("Path param is not number. Should return 500 ", async () => {
        const response = await request(app)
            .post("/books/k")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(500);
    })

    it("Path param is missing. Should return 422 ", async () => {
        const response = await request(app)
            .post("/books/")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    it("Duplicate value combination going to database. Should return 500 with message", async () => {
        await request(app)
            .post("/books/3")
            .send({data: {title: 'duplicate title', author: 'duplicate author', description: ''}});

        const response = await request(app)
            .post("/books/4")
            .send({data: {title: 'duplicate title', author: 'duplicate author', description: ''}});
        
        expect(response.statusCode).toBe(500);
        
    })

    it("Valid request. Should return 200", async () => {
        const response = await request(app)
            .post("/books/1")
            .send({data: {title: 'test title 2', author: 'test author', description: ''}});
        expect(response.statusCode).toBe(200);

        const db = await openDb();
        const query = "SELECT bookId, title, author, description from Books where title = ?";
        const result = await db.all<BookWithId[]>(query, ["test title 2"])
        db.close();

        expect(result !== undefined).toBe(true);
        expect(result.length).toBe(1);

    })


    it("Valid request without description field. Should return 200", async () => {
        const response = await request(app)
            .post("/books/1")
            .send({data: {title: 'test title 2', author: 'test author 2'}});

        expect(response.statusCode).toBe(200);
    })

})

describe("GET /books", () => {
    it("should return 200 and list", async () => {

        const response = await request(app)
            .get("/books")
            .send()

        expect(JSON.parse(response.text).length).toBe(7)
        expect(response.statusCode).toBe(200)
    })
})


describe("POST /books", () => {
    it("Empty data given. Return 422 and error message", async () => {

        const response = await request(app)
            .post("/books")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
        expect(response.text).toBe(`Fields can't be empty: title,author`)
    })

    it("Valid data given. Return 200", async () => {

        const response = await request(app)
            .post("/books")
            .send({data: {title: 'added title', author: 'added author', description: ''}});

            expect(response.statusCode).toBe(200);

        const db = await openDb();
        let query = "SELECT bookId, title, author, description from Books where title = ?";
        const result = await db.all<BookWithId[]>(query, ["added title"])

        expect(result !== undefined).toBe(true);
        expect(result.length).toBe(1);

        query = `DELETE FROM BOOKS WHERE title = ?`; 
        await db.run(query, ['added title']);
        db.close();
    })


})

describe("DELETE /books/:id", () => {
    it("should return 200 and list", async () => {

        const response = await request(app)
            .delete("/books/8")
            .send()
            
        expect(response.statusCode).toBe(200)

        const db = await openDb();
        const query = "SELECT bookId, title, author, description from Books where bookId = ?";
        const result = await db.all<BookWithId[]>(query, ["8"])
        db.close();

        expect(result !== undefined).toBe(true);
        expect(result.length).toBe(0);
    })
})