import express from "express";

;
import getUser from "../../../Middlewares/Auth/getUser.middleware copy";
import { productController } from "../../../Controllers/index.controller";



const productAuthRouter = express.Router();


productAuthRouter.use(getUser);
productAuthRouter.post('/', productController.createProducts);
productAuthRouter.patch('/:productId', productController.updateProducts);
productAuthRouter.delete('/:productId', productController.deleteProducts);



export default productAuthRouter;