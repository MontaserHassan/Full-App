import mongoose from "mongoose";
import { Review } from "./review.model";



interface ProductModel extends mongoose.Document {
    categoryId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    color: string;
    quantity: number;
    description: string;
    averageRating: number;
    reviews: mongoose.Types.ObjectId[];
};


const productSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'review'
            }
        ],
    },
    {
        timestamps: true,
    },
);


productSchema.statics.calculateAverageRating = async function (productId: mongoose.Schema.Types.ObjectId) {
    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    const product = await Product.findById(productId);
    product.averageRating = averageRating;
    await product.save();
};


const Product = mongoose.model<ProductModel>('product', productSchema);



export {
    Product,
    ProductModel,
};