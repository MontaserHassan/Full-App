import { client } from "../../Config/index.config";
import itemExistsInElasticSearch from "./itemExists.util";



const addIndexToElasticSearch = async (cachedItem: string, indexName: string) => {
    console.log('cachedItem: ', cachedItem)
    const items = JSON.parse(cachedItem);
    for (const item of items) {
        delete item._id;
        const itemExists = await itemExistsInElasticSearch(item.name, indexName);
        if (!itemExists) await client.index({ index: indexName, body: item });
    };
};



export default addIndexToElasticSearch;