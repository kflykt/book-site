import { Router } from 'express';
import bookRouter from './bookController';

const router = Router()

router.route('/').get((request, response) => {
    response.send('this is default  test');
})

router.use('/books', bookRouter);

export default router;