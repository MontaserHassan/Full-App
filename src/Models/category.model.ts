import mongoose from "mongoose";



interface CategoryModel extends mongoose.Document {
    name: string;
    description: string;
};


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);


const Category = mongoose.model<CategoryModel>('category', categorySchema);



export {
    Category,
    CategoryModel,
};