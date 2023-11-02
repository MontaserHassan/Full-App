import express from 'express';

import getAdmin from '../../Middlewares/Auth/getAdmin.middleware';
import authRouter from './auth/auth.routes';
import adminAuthRouter from './adminAuth/adminAuth.routes';
import productRouter from './product/product.routes';
import categoryRouter from './category/category.routes';



const backOffice = express.Router();


backOffice.use('/auth', authRouter);
backOffice.use(getAdmin());
backOffice.use('/adminAuth', adminAuthRouter)
backOffice.use('/product', productRouter);
backOffice.use('/category', categoryRouter);



export default backOffice;