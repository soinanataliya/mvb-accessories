import { authGuard } from "../../common/guards/auth.guard.js";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import he from "he";
import AccessoriesService from "./acessories.service.js";

const ACCESSORIES = "/accessories";

const escapeString = (input: string): string => {
  // TODO перенести в отдельный модуль
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
  accessoriesService: AccessoriesService
) {
  server.get(ACCESSORIES, async (request, reply) => {
    try {
      return accessoriesService.getAllAccessories();
    } catch {
      reply.code(500).send({ error: "Error in getting data" });
    }
  });

  server.delete<AccessoryDelete>(
    ACCESSORIES,
    { preHandler: [authGuard] },
    async (request, reply) => {
      try {
        const { id } = request.body;
        return accessoriesService.deleteAccessory(id);
      } catch {
        reply.code(500).send({ error: "Error in deleting data" });
      }
    }
  );

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

        await accessoriesService.createAccessory(
          {
            name: checkedName,
            price: checkedPrice,
          },
          file,
          fileType.value
        );

        return { message: "Files and fields uploaded successfully" };
      } catch (error) {
        reply.code(500).send({ error: "An error occurred" });
      }
    }
  );
}
