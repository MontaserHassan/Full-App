import express from "express";

import { productController } from "../../../Controllers/index.controller";


const getProductRouter = express.Router();


getProductRouter.get('/', productController.getProducts);
getProductRouter.get('/search', productController.searchOnProductsWithName);
getProductRouter.get('/:productId', productController.getProductById);
getProductRouter.get('/category/:categoryId', productController.getProductByCategory);
getProductRouter.get('/pagination/:page', productController.getProductByPagination);



export default getProductRouter;