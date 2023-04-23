import { authGuard } from "../../common/guards/auth.guard.js";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import { Knex } from "knex";
import AccessoriesRepository from "./acessories.repository.js";

const ACCESSORIES = "/accessories";

interface AccessoryDelete extends RouteGenericInterface {
  Body: { id: string };
}
interface AccessoryPost extends RouteGenericInterface {
  Body: { name: string; price: string };
}

export function useAccessoriesController(
  server: FastifyInstance,
  dbConnection: Knex
) {
  server.get(ACCESSORIES, async (req, res) => {
    return dbConnection("acc").select();
  });
  server.delete<AccessoryDelete>(ACCESSORIES, async (req, res) => {
    const { id } = req.body;
    return dbConnection("acc").where("id", id).del("id");
  });
  server.post<AccessoryPost>(
    ACCESSORIES,
    {
      preHandler: [authGuard],
    },
    async (req, res) => {
      const { name, price } = req.body;
      const generatedData = AccessoriesRepository.createAccessory(name, price);
      return dbConnection("acc").insert(generatedData);
    }
  );
}
