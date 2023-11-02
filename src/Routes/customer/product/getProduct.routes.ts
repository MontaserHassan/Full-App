import express from "express";

import { productController } from "../../../Controllers/index.controller";


const getProductRouter = express.Router();


getProductRouter.get('/', productController.getProducts);
getProductRouter.get('/:productId', productController.getProductById);
getProductRouter.get('/:categoryId', productController.getProductByCategory);
getProductRouter.get('/:page', productController.getProductByPagination);
getProductRouter.get('/search', productController.searchOnProductsWithName);



export default getProductRouter;