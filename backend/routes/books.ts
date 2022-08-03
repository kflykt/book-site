
 import { Router } from 'express';


 const bookRouter = Router();


 bookRouter.get("/", (request, response) => {
    response.send("here will be list of books")
 })


 export default bookRouter;