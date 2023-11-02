import { redisClient } from '../../Config/index.config';


const refreshCacheForKey = async (key, fetchFromDatabase) => {
    try {
        const newData = await fetchFromDatabase();
        await redisClient.set(key, JSON.stringify(newData));
        return newData;
    } catch (error) {
        console.error(`Error refreshing cache for key ${key}:`, error);
    }
};



export default refreshCacheForKey;