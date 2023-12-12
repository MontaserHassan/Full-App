import Redis from 'ioredis';



const redisClient = new Redis({
    host: 'redis-16983.c259.us-central1-2.gce.cloud.redislabs.com',
    port: 16983,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
});



export default redisClient; 