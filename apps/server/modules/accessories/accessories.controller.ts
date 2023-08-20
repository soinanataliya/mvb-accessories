import { authGuard } from "../../common/guards/auth.guard.js";
import { Knex } from "knex";
import AccessoriesRepository from "./acessories.repository.js";
import fs from "fs";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import { pipeline } from "stream";
import util from "util";

const ACCESSORIES = "/accessories";

interface AccessoryDelete extends RouteGenericInterface {
  Body: { id: string };
}
interface AccessoryPost extends RouteGenericInterface {
  Body: { name: string; price: string };
}

interface FieldValue {
  value: string;
}

export function useAccessoriesController(
  server: FastifyInstance,
  dbConnection: Knex
) {
  server.get(ACCESSORIES, async (req, res) => {
    return dbConnection("acc").select();
  });

  server.delete<AccessoryDelete>(
    ACCESSORIES,
    {
      preHandler: [authGuard],
    },
    async (req, res) => {
      const { id } = req.body;
      return dbConnection("acc").where("id", id).del("id");
    }
  );

  const pump = util.promisify(pipeline);

  server.post<AccessoryPost>(
    ACCESSORIES,
    { preHandler: [authGuard] },
    async (request, reply) => {
      try {
        const file = await request.file({
          limits: {
            fileSize: 20 * 1024 * 1024, //20MB
            files: 1,
          },
        });

        if (!file?.file) {
          return reply.code(400).send({ error: "No file" });
        }

        const name = file.fields.name as FieldValue;
        const price = file.fields.price as FieldValue;
        if (!name.value || !price.value) {
          return reply.code(400).send({ error: "No data" });
        }

        await pump(
          file.file,
          fs.createWriteStream(`./uploads/${file?.filename}.jpeg`) // TODO
        );

        const generatedData = AccessoriesRepository.createAccessory(
          name.value,
          price.value
        );
          // TODO file link
        return dbConnection("acc").insert(generatedData);

        // return { message: "Files and fields uploaded successfully" };
      } catch (error) {
        reply.code(500).send({ error: "An error occurred" });
      }
    }
  );
}
