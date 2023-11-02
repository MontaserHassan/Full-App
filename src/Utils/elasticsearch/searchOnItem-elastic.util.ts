import { client } from "../../Config/index.config";


const searchOnItemInElastic = async (indexName: string, name: string) => {
    const searchResult = await client.search({
        index: indexName,
        body: {
            query: { regexp: { name: `.*${name.toLowerCase()}.*` } }
        },
    });
    const categories = searchResult.hits.hits.map(hit => hit._source);
    if (categories.length === 0) return null;
    return categories;
};



export default searchOnItemInElastic;