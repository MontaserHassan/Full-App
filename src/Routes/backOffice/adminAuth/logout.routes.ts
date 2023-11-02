import express from 'express';

import { adminController } from '../../../Controllers/index.controller';



const logoutRouter = express.Router();


logoutRouter.patch('/', adminController.logoutAdmin);



export default logoutRouter;