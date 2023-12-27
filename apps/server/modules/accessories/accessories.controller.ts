import { authGuard } from "../../common/guards/auth.guard.js";
import { Knex } from "knex";
import AccessoriesRepository from "./acessories.repository.js";
import fs from "fs";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import { pipeline } from "stream";
import util from "util";
import he from "he";

const ACCESSORIES = "/accessories";
const FILE = "/file/:filename";

const fileTypeMapper: Record<string, string | undefined> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
};

const escapeString = (input: string): string => {
  return he.escape(input);
};

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
  server.get(ACCESSORIES, async (request, reply) => {
    try {
      const data = dbConnection("acc").select();
      return data;
    } catch {
      reply.code(500).send({ error: "Error in getting data" });
    }
  });

  server.delete<AccessoryDelete>( // TODO delete files from folder
    ACCESSORIES,
    {
      preHandler: [authGuard],
    },
    async (request, reply) => {
      try {
        const { id } = request.body;
        const result = await dbConnection("acc").select().where("id", id);
        const fileName = result[0].src;
        fileName && fs.unlinkSync(`./uploads/${fileName}`);
        return dbConnection("acc").where("id", id).del("id");
      } catch {
        reply.code(500).send({ error: "Error in deleting data" });
      }
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
        const fileType = file.fields.fileType as FieldValue;

        const checkedName = escapeString(name.value);
        const checkedPrice = escapeString(price.value);

        if (!name.value || !price.value) {
          return reply.code(400).send({ error: "No data" });
        }

        const generatedData = AccessoriesRepository.createAccessory(
          checkedName,
          checkedPrice,
          fileTypeMapper[fileType.value] ?? ""
        );

        await pump(
          file.file,
          fs.createWriteStream(
            `./uploads/${generatedData.id}${fileType && "."}${
              fileTypeMapper[fileType.value]
            }`
          )
        );

        await dbConnection("acc").insert(generatedData);
        return { message: "Files and fields uploaded successfully" };
      } catch (error) {
        reply.code(500).send({ error: "An error occurred" });
      }
    }
  );

  server.get(FILE, async (request, reply) => {
    try {
      // @ts-ignore
      const { filename } = request.params;
      const fileUrl = `/uploads/${filename}`;

      return { fileUrl };
    } catch (error) {
      console.error(error);
      reply.code(500).send("Internal Server Error");
    }
  });
}
