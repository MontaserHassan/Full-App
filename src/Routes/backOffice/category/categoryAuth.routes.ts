import express from "express";

import { categoryController } from "../../../Controllers/index.controller";



const categoryAuthRouter = express.Router();


categoryAuthRouter.post('/', categoryController.createCategory);
categoryAuthRouter.patch('/:categoryId', categoryController.updateCategory);
categoryAuthRouter.delete('/:categoryId', categoryController.deleteCategory);



export default categoryAuthRouter;