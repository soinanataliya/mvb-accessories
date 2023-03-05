import fastify from "fastify";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { useAccessoriesController } from "./modules/accessories/accessories.controller.js";
import { dbConnection } from "./dbConnection.js";

export default function build(opts: any) {
  const server = fastify<Server, IncomingMessage, ServerResponse>(opts);
  useAccessoriesController(server, dbConnection);
  return server;
}
