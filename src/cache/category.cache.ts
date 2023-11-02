import { Category } from '../Models/category.model';
import { dataCached } from '../Utils/index.util'



const categoryCache = () => {
    dataCached.refreshCacheForKey('categories', () => dataCached.fetchFromDatabase(Category))
        // .then(() => console.log("New Data"))
        .catch((error) => console.error("Error: ", error));
};



const refreshInterval = 30 * 60 * 1000;

setInterval(categoryCache, refreshInterval);

categoryCache();