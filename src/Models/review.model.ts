import mongoose from 'mongoose';
import { Product } from './product.model';



interface ReviewModel extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    rating: number;
    review: string;
};


const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);


const Review = mongoose.model<ReviewModel>('review', reviewSchema);



export {
    Review,
    ReviewModel,
};