
import { Router, Request, Response } from 'express';
import { insertBookData, updateBookData } from '../core/book';
import { getBooks } from '../database/repos/bookrepo';
import { validateBook } from './bookValidator';


  const bookRouter = Router();


  bookRouter.route("/").get((request, response) => {
   getBooks().then((bookList) => {
    response.send(JSON.stringify(bookList));
    });
  })

  bookRouter.route("/:bookId").post(validateBook, (request: Request, response: Response) => {
    updateBookData(request, response)
  });

  bookRouter.route("/").post(validateBook, (request: Request, response: Response) => {
    insertBookData(request, response)
  });

 export default bookRouter;




