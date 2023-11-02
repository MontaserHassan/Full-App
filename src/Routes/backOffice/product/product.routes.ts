import express from 'express';

import productAuthRouter from './productAuth.routes';
import getProductRouter from './getProduct.routes';



const productRouter = express.Router();


productRouter.use('/', getProductRouter);
productRouter.use('/productAuth', productAuthRouter);



export default productRouter;