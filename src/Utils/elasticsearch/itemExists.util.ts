import { client } from "../../Config/index.config";



const itemExistsInElasticSearch = async (itemName: string, indexName: string): Promise<boolean> => {
    const searchResult = await client.search({
        index: indexName,
        body: {
            query: { match: { name: itemName } }
        }
    });
    const itemExists = (searchResult.hits.total as { value: number }).value;
    return itemExists > 0;
};



export default itemExistsInElasticSearch;