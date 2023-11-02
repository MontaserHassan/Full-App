import express from 'express';

import { adminController } from '../../../Controllers/index.controller';
import validation from '../../../Validations/validationHandler.validation';
import { adminAuthValidator } from '../../../Validations/admin.validation';



const authRouter = express.Router();


authRouter.post('/register', validation(adminAuthValidator.registerAdmin), adminController.registerAdmin);
// authRouter.post('/login', validation(adminAuthValidator.loginAdmin), adminController.loginAdmin);
authRouter.post('/login', adminController.loginAdmin);



export default authRouter;