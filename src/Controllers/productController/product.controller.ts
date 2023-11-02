import { NextFunction, Request, Response } from "express";

import CustomError from "../../Utils/customError.util";
import { errorProductMessage, errorCategoryMessage, successProductMessage } from "../../Messages/index.message";
import { productService, categoryService } from "../../Services/index.service";



// --------------------------------- get product by id ---------------------------------


const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productService.getProductById(req.params.productId);
        if (!product) throw new CustomError(errorProductMessage.notFoundProduct, 404, "product");
        res.status(200).send({ product: product, message: successProductMessage.productExists });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get product by category ---------------------------------


const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryService.getCategoryById(req.params.categoryId);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        const products = await productService.getProductsByCategory(req.params.categoryId);
        if (!products) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "product");
        res.status(200).send({ message: successProductMessage.productsExist, products: products });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get product by pagination ---------------------------------


const getProductByPagination = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProductsWithPagination(Number(req.params.page));
        if (!products.products || products.paginationInfo.status === 404) throw new CustomError(errorProductMessage.notFoundProducts, 404, "product");
        res.status(200).send({ message: successProductMessage.productsExist, paginationInfo: products.paginationInfo, products: products.products, });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get products ---------------------------------


const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getProducts();
        res.status(200).send({ message: successProductMessage.productsExist, products: products });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- create product ---------------------------------


const createProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryName, name, price, color, quantity, description } = req.body;
        const category = await categoryService.getCategoryByName(categoryName);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        const product = await productService.createProduct(category._id, name, price, color, quantity, description);
        if (!product) throw new CustomError(errorProductMessage.doesNotCreated, 404, "product");
        res.status(200).send({ message: successProductMessage.created, product: product });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- update product ---------------------------------


const updateProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, color, quantity, description } = req.body;
        const { productId } = req.params;
        const product = await productService.getProductById(productId);
        if (!product) throw new CustomError(errorProductMessage.notFoundProduct, 404, "product");
        const updatedProduct = await productService.updateProduct(productId, name, price, color, quantity, description);
        if (!updatedProduct) throw new CustomError(errorProductMessage.doesNotUpdated, 404, "product");
        res.status(200).send({ message: successProductMessage.updated, product: updatedProduct });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- delete product ---------------------------------


const deleteProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProductById(productId);
        if (!product) throw new CustomError(errorProductMessage.notFoundProduct, 404, "product");
        const deletedProduct = await productService.deleteProduct(productId);
        if (!deletedProduct) throw new CustomError(errorProductMessage.doesNotDeleted, 404, "product");
        res.status(200).send({ message: successProductMessage.deleted, product: deletedProduct });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get products by name ---------------------------------


const searchOnProductsWithName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query;
        const products = await productService.searchOnProductsWithName(String(name));
        if (!products) throw new CustomError(errorProductMessage.notFoundProducts, 404, "products");
        const productsLength = products.length;
        res.status(200).send({ message: successProductMessage.search, length: productsLength, products: products });
    } catch (err) {
        next(err);
    };
};





export default {
    getProductById,
    getProductByCategory,
    getProductByPagination,
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    searchOnProductsWithName,
};