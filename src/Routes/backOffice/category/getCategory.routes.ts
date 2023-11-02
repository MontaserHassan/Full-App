import express from "express";

import { categoryController } from "../../../Controllers/index.controller";


const getCategoryRouter = express.Router();


getCategoryRouter.get('/', categoryController.getCategories);
getCategoryRouter.get('/name/', categoryController.getCategoryByName);
getCategoryRouter.get('/:categoryId', categoryController.getCategoryById);



export default getCategoryRouter;