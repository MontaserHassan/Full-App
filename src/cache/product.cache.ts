import { Product } from '../Models/product.model';
import { dataCached } from '../Utils/index.util'



const productsCache = () => {
    dataCached.refreshCacheForKey('products', () => dataCached.fetchFromDatabase(Product))
        // .then(() => console.log("New Data"))
        .catch((error) => console.error("Error: ", error));
};



const refreshInterval = 24 * 60 * 60 * 1000;

setInterval(productsCache, refreshInterval);

productsCache();