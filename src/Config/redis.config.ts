import Redis from 'ioredis';



const redisClient = new Redis({
    host: 'redis-11566.c238.us-central1-2.gce.cloud.redislabs.com',
    port: 11566,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});



export default redisClient; 