import request from 'supertest'
import app from '../app';
import { BookWithId } from '../core/book';
import { openDb } from '../database/database';

describe("Post /books/:bookId", () => {

    test("No form data. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/1")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
        expect(response.text).toBe(`Fields can't be empty: title,author`)
    })

    test("No title given. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/1")
            .send({data: {title: '', author: 'test', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    test("No author given. Should return 422 with message", async () => {
        const response = await request(app)
            .post("/books/1")
            .send({data: {title: 'some title', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    test("Path param is not number. Should return 500 ", async () => {
        const response = await request(app)
            .post("/books/k")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(500);
    })

    test("Path param is missing. Should return 422 ", async () => {
        const response = await request(app)
            .post("/books/")
            .send({data: {title: '', author: '', description: ''}});

        expect(response.statusCode).toBe(422);
    })

    test("Duplicate value combination going to database. Should return 500 with message", async () => {
        const response1 = await request(app)
            .post("/books/2")
            .send({data: {title: 'duplicate title', author: 'duplicate author', description: ''}});
            
        expect(response1.statusCode).toBe(200);

        const response2 = await request(app)
            .post("/books/3")
            .send({data: {title: 'duplicate title', author: 'duplicate author', description: ''}});
        
        expect(response2.statusCode).toBe(500);
        
    })

    test("Valid request. Should return 200", async () => {
        const response = await request(app)
            .post("/books/4")
            .send({data: {title: 'test title 4', author: 'test author 4', description: ''}});
        expect(response.statusCode).toBe(200);

        const db = await openDb();
        const query = "SELECT bookId, title, author, description from Books where title = ?";
        const result = await db.all<BookWithId[]>(query, ["test title 4"])
        db.close();

        expect(result !== undefined).toBe(true);
        expect(result.length).toBe(1);

    })


    test("Valid request without description field. Should return 200", async () => {
        const response = await request(app)
            .post("/books/5")
            .send({data: {title: 'test title 5', author: 'test author 5'}});

        expect(response.statusCode).toBe(200);
    })

})

describe("GET /books", () => {
    test("should return 200 and list", async () => {

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

    test("Valid data given. Return 200", async () => {

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
    test("should return 200 and list", async () => {

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