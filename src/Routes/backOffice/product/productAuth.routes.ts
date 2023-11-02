import express from "express";

import { productController } from "../../../Controllers/index.controller";



const productAuthRouter = express.Router();


productAuthRouter.post('/', productController.createProducts);
productAuthRouter.patch('/:productId', productController.updateProducts);
productAuthRouter.delete('/:productId', productController.deleteProducts);



export default productAuthRouter;