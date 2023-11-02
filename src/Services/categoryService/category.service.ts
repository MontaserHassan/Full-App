import { Category, CategoryModel } from "../../Models/category.model";



// ------------------------------ get category by id ------------------------------


const getCategoryById = async (categoryId: string) => {
    const category = await Category.findById(categoryId);
    return category;
};


// ------------------------------ get category by name ------------------------------


const getCategoryByName = async (name: string) => {
    const category = await Category.findOne({ name: { $regex: name, $options: 'i' } });
    return category;
};


// ------------------------------ get categories ------------------------------


const getCategories = async () => {
    const categories = await Category.find();
    return categories;
};


// ------------------------------ create category ------------------------------


const createCategory = async (name: string, description: string) => {
    const newCategory: CategoryModel = await Category.create({
        name: name,
        description: description,
    });
    return newCategory;
};


// ------------------------------ update category ------------------------------


const updateCategory = async (categoryId: string, name: string, description: string) => {
    const category: CategoryModel = await Category.findByIdAndUpdate({ _id: categoryId }, {
        name: name,
        description: description,
    }, { new: true });
    return category;
};


// ------------------------------ delete category ------------------------------


const deleteCategory = async (categoryId: string) => {
    const category = await Category.findByIdAndDelete(categoryId);
    return category;
}

export default {
    getCategoryById,
    getCategoryByName,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};