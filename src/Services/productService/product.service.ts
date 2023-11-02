import { Document, Model } from "mongoose";

import { Product, ProductModel } from "../../Models/product.model";
import { pagination } from "../../Utils/index.util";



// --------------------------------- get product by id ---------------------------------


const getProductById = async (productId: string) => {
    const product: ProductModel = await Product.findById(productId);
    return product;
};


// --------------------------------- get products ---------------------------------


const getProducts = async () => {
    const products = await Product.find();
    return products;
};


// --------------------------------- get products by category ---------------------------------


const getProductsByCategory = async (categoryId: string) => {
    const products = await Product.find({ categoryId });
    return products;
};


// --------------------------------- get products with pagination ---------------------------------


const getProductsWithPagination = async (page: number) => {
    const paginationInfo = await pagination(Product, page);
    const products = await Product.find().skip(paginationInfo.skip).limit(paginationInfo.limit);
    return { products: products, paginationInfo: paginationInfo };
};


// --------------------------------- create product ---------------------------------


const createProduct = async (categoryId: string, name: string, price: number, color: string, quantity: number, description: string) => {
    const newProduct: ProductModel = await Product.create({
        categoryId: categoryId,
        name: name,
        price: price,
        color: color,
        quantity: quantity,
        description: description,
    });
    return newProduct;
};


// --------------------------------- update product ---------------------------------


const updateProduct = async (productId: string, name: string, price: number, color: string, quantity: number, description: string) => {
    const product: ProductModel = await Product.findByIdAndUpdate({ _id: productId }, {
        name: name,
        price: price,
        color: color,
        quantity: quantity,
        description: description,
    }, { new: true });
    return product;
};


// --------------------------------- delete product ---------------------------------


const deleteProduct = async (productId: string) => {
    const product: ProductModel = await Product.findByIdAndDelete({ _id: productId });
    return product;
};


// --------------------------------- get product by name ---------------------------------


const searchOnProductsWithName = async (name: string) => {
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    return products;
};



export default {
    getProductById,
    getProducts,
    getProductsByCategory,
    getProductsWithPagination,
    createProduct,
    updateProduct,
    deleteProduct,
    searchOnProductsWithName,
};