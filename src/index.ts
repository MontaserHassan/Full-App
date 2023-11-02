import express, { Express } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { DBConnection } from './Connections/index.connection';
import router from './Routes/index.routes';
import './cache/index.cache';



const app: Express = express();
const server: Server = http.createServer(app);


app.use(cors());
app.use(express.json());

DBConnection(server);
app.use(router);