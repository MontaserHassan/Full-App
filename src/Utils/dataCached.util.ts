import { Document, Model } from "mongoose";

import { redisClient } from "../Config/index.config";



const refreshCacheForKey = async (key: string, fetchFromDatabase: () => Promise<Document[]>) => {
    try {
        const newData = await fetchFromDatabase();
        await redisClient.set(key, JSON.stringify(newData));
        return newData;
    } catch (error) {
        console.error(`Error refreshing cache for key ${key}: `, error);
    };
};

const fetchFromDatabase = async (Model: Model<Document>) => {
    const products = await Model.find();
    return products || [];
};



export default {
    refreshCacheForKey,
    fetchFromDatabase,
};