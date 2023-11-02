import { client } from "../../Config/index.config";



async function connectToElasticsearch() {
    let connected = false;
    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 2000;

    while (!connected && retryCount < maxRetries) {
        try {
            const response = await client.ping();
            console.log('Connected to Elasticsearch:', response);
            connected = true;
        } catch (error) {
            console.error('Failed to connect to Elasticsearch: ', error);
            retryCount++;
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        };
    };
    if (!connected) { console.error('Failed to connect to Elasticsearch after multiple retries.'); };

    const indexName = 'product';
    // await client.indices.create({ index: indexName });
    // console.log(`Created index: ${indexName} `);
    // await client.indices.delete({ index: indexName });
    // console.log(`Deleted index: ${indexName} `);
};



export default connectToElasticsearch;

// -------------------------------- example --------------------------------
// const searchResult = await client.search({
//     index: indexName,
//     body: {
//         query: {
//             match: {
//                 name: 'montaser',
//             },
//         },
//     },
// });
// console.log('Search results:', searchResult.hits.hits);