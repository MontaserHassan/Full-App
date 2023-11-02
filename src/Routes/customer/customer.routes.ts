import express from 'express';

import getAdmin from '../../Middlewares/Auth/getAdmin.middleware';
import authCustomerRouter from './auth/auth-customer.routes';
import product from './product/product.routes';



const customer = express.Router();


customer.use(getAdmin);
customer.use('/auth', authCustomerRouter);
customer.use('/product', product);



export default customer;