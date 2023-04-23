/* eslint-disable react-hooks/rules-of-hooks */
import fastify from "fastify";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { useAccessoriesController } from "./modules/accessories/accessories.controller.js";
import { dbConnection } from "./dbConnection.js";
import { useAuthController } from "./modules/auth/auth.controller.js";

export default function build(opts: any) {
  const server = fastify<Server, IncomingMessage, ServerResponse>(opts);
  server.register(import('@fastify/cookie'))
  useAccessoriesController(server, dbConnection);
  useAuthController(server);
  return server;
}
