import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express"

import { swaggerJsDocConfig } from './config/swagger';

dotenv.config();

import Router from './routers/index';

const server = express();
const openapiSpecification = swaggerJsdoc(swaggerJsDocConfig);

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));

server.use('/', Router);

// DOCUMENTATION:Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export default server;
