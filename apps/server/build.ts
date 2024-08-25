/* eslint-disable react-hooks/rules-of-hooks */
import fastify from "fastify";
import { IncomingMessage, Server, ServerResponse } from "node:http";
import { useAccessoriesController } from "./modules/accessories/accessories.controller.js";
import { dbConnection } from "./dbConnection.js";
import { useAuthController } from "./modules/auth/auth.controller.js";
import path from 'node:path';
import { fileURLToPath } from "node:url";
import AccessoriesRepository from "./modules/accessories/acessories.repository.js";
import AccessoriesService from "./modules/accessories/acessories.service.js";
import CategoriesRepository from "./modules/categories/categories.repository.js";
import CategoriesService from "./modules/categories/categories.service.js";
import { useCategoriesController } from "./modules/categories/categories.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function build(opts: any) {
  const server = fastify<Server, IncomingMessage, ServerResponse>(opts);
  server.register(import('@fastify/cookie'));

  server.register(import('@fastify/multipart'));

  server.register(import('@fastify/static'), {
    root: path.join(__dirname, '/uploads'),
    prefix: '/uploads/',
  });

  const accessoriesRepository = new AccessoriesRepository(dbConnection);
  const accessoriesService = new AccessoriesService(accessoriesRepository);

  const categoriesRepository = new CategoriesRepository(dbConnection);
  const categoriesService = new CategoriesService(categoriesRepository);

  useAccessoriesController(server, accessoriesService);
  useCategoriesController(server, categoriesService);

  useAuthController(server);
  return server;
}
