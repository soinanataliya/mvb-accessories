/* eslint-disable react-hooks/rules-of-hooks */
import fastify from "fastify";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { useAccessoriesController } from "./modules/accessories/accessories.controller.js";
import { dbConnection } from "./dbConnection.js";
import { useAuthController } from "./modules/auth/auth.controller.js";
import path from 'path';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log();

export default function build(opts: any) {
  const server = fastify<Server, IncomingMessage, ServerResponse>(opts);
  server.register(import('@fastify/cookie'));

  server.register(import('@fastify/multipart') );

  server.register(import('@fastify/static'), {
    root: path.join(__dirname, '/uploads'),
    prefix: '/uploads/',
  } );
  
  useAccessoriesController(server, dbConnection);
  useAuthController(server);
  return server;
}
