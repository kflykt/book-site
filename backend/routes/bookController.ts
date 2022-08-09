
 import { json, Router } from 'express';
import { getBooks } from '../database/repos/bookrepo';


 const bookRouter = Router();


 bookRouter.route("/").get((request, response) => {
   getBooks().then((bookList) => {
    response.send(JSON.stringify(bookList));
   });
   
 })


 export default bookRouter;