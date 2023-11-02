import mongoose from 'mongoose';
import { Server } from 'http';

import { redisClient, startingApp } from '../../Config/index.config';
import { connectToElasticsearch } from '../../Connections/index.connection';



const DB_URL = String(process.env.DB_URL);


const DBConnection = (server: Server) => {
    mongoose.connect(DB_URL, {
    }).then(() => {
        console.log("Database Connected....");
        startingApp(server);
        redisClient.on('connect', () => console.log('Redis Client Connected'));
        connectToElasticsearch();
    }).catch((err: Error) => { console.log(err) });
};



export default DBConnection;