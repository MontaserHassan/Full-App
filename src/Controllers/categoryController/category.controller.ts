import { NextFunction, Request, Response } from "express";

import CustomError from "../../Utils/customError.util";
import { addIndexToElasticSearch, searchOnItemInElastic } from "../../Utils/index.util";
import { categoryService, getCachedDate } from "../../Services/index.service";
import { errorCategoryMessage, successCategoryMessage } from "../../Messages/index.message";
import { CategoryModel } from "../../Models/category.model";



// --------------------------------- get categories ---------------------------------


const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cachedCategories = await getCachedDate('categories');
        if (cachedCategories) return res.status(200).send({ cache: "Fetching all categories from Redis cache", categories: JSON.parse(cachedCategories) });
        const categories = await categoryService.getCategories();
        if (!categories) throw new CustomError(errorCategoryMessage.notFoundCategories, 404, "category");
        res.status(200).send({ message: successCategoryMessage.categoriesExist, categories: categories });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get category by id ---------------------------------


const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const cachedCategories = await getCachedDate('categories');
        if (cachedCategories) {
            const categories = JSON.parse(cachedCategories);
            const category = categories.find((category: CategoryModel) => category._id === categoryId);
            if (category) return res.status(200).send({ cache: "Fetching category from Redis", category: category });
        };
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        res.status(200).send({ category: category, message: successCategoryMessage.categoryExists });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- get category by name ---------------------------------


const getCategoryByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const cachedCategories = await getCachedDate('categories');
        if (cachedCategories) {
            const indexName = 'name';
            await addIndexToElasticSearch(cachedCategories, indexName);
            const category = await searchOnItemInElastic(indexName, name);
            return res.status(200).send({ cache: "Fetching category from Elasticsearch", category: category });
        };
        const category = await categoryService.getCategoryByName(name);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        res.status(200).send({ category: category, message: successCategoryMessage.categoryExists });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- create category ---------------------------------


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const category = await categoryService.getCategoryByName(name);
        if (category) throw new CustomError(errorCategoryMessage.alreadyExists, 400, "category");
        const newCategory = await categoryService.createCategory(name, description);
        if (!newCategory) throw new CustomError(errorCategoryMessage.doesNotCreated, 404, "category");
        res.status(200).send({ category: newCategory, message: successCategoryMessage.created });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- update category ---------------------------------


const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const { categoryId } = req.params;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        const updatedCategory = await categoryService.updateCategory(categoryId, name, description);
        if (!updatedCategory) throw new CustomError(errorCategoryMessage.doesNotUpdated, 404, "category");
        res.status(200).send({ category: updatedCategory, message: successCategoryMessage.updated });
    } catch (err) {
        next(err);
    };
};


// --------------------------------- delete category ---------------------------------


const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) throw new CustomError(errorCategoryMessage.notFoundCategory, 404, "category");
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        if (!deletedCategory) throw new CustomError(errorCategoryMessage.doesNotDeleted, 404, "category");
        res.status(200).send({ category: deletedCategory, message: successCategoryMessage.deleted });
    } catch (err) {
        next(err);
    };
};



export default {
    getCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
};