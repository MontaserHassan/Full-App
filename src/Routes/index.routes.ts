import express, { Request, Response } from 'express';

import errorHandler from '../Middlewares/Error/error.middleware';
import backOffice from './backOffice/backOffice.routes';
import customer from './customer/customer.routes';



const router = express.Router();


router.use('/customer', customer);
router.use('/backOffice', backOffice);
router.use('*', (req: Request, res: Response) => res.status(404).send({ message: `This url not found ${req.baseUrl}` }));
router.use(errorHandler);



export default router;