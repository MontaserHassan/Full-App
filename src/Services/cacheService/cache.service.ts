import { redisClient } from "../../Config/index.config";



const getCachedDate = async (key: string) => {
    const cachedData = await redisClient.get(key);
    return cachedData;
};



export default getCachedDate;