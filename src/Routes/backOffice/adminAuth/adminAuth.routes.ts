import express from 'express';

import logoutRouter from './logout.routes';



const adminAuthRouter = express.Router();


adminAuthRouter.use('/logout', logoutRouter);



export default adminAuthRouter;