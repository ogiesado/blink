import express from 'express';
import bootstrap from './bootstrap';

const server = express();

bootstrap(server);

export default server;
