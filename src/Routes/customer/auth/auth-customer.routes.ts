import express from 'express';

import authRouter from './auth.routes';



const authCustomerRouter = express.Router();


authCustomerRouter.use('/', authRouter);



export default authCustomerRouter;