import express from 'express';
import bootstrap from './bootstrap';

/**
 * Makes a server
 * @return {Promise} A promise resolved with created server
 */
export default async function makeServer() {
  const server = express();

  try {
    await bootstrap(server);
    return server;
  } catch (error) {
    throw error;
  }
}
