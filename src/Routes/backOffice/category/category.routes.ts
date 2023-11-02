import express from 'express';
import getCategoryRouter from './getCategory.routes';
import categoryAuthRouter from './categoryAuth.routes';



const categoryRouter = express.Router();


categoryRouter.use('/', getCategoryRouter);
categoryRouter.use('/categoryAuth', categoryAuthRouter);



export default categoryRouter;