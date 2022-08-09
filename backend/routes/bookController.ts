
 import { json, Router } from 'express';
import { getBooks } from '../database/repos/bookrepo';


 const bookRouter = Router();


 bookRouter.route("/").get((request, response) => {
   getBooks().then((bookList) => {
    console.log(bookList, 12);
    response.send(JSON.stringify(bookList));
   });
   
 })


 export default bookRouter;