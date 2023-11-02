import express from 'express';

import { customerController } from '../../../Controllers/index.controller';



const authRouter = express.Router();


authRouter.post('/register', customerController.registerCustomer);
authRouter.post('/login', customerController.loginCustomer);



export default authRouter;