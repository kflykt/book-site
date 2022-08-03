import { Router } from 'express';
import bookRouter from './books';

const routes = Router()

routes.use('/', (request, response) => {
    response.send('this is default route');
})

routes.use('/books', bookRouter);


export default routes;