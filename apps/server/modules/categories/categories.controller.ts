import { authGuard } from "../../common/guards/auth.guard.js";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import he from "he";
import CategoriesService from "./categories.service.js";

const escapeString = (input: string): string => {
  // TODO перенести в отдельный модуль
  return he.escape(input);
};

const CATEGORIES = "/categories";

interface CategoryDelete extends RouteGenericInterface {
  Body: { id: string };
}
interface CategoryPost extends RouteGenericInterface {
  Body: string;
}

export function useCategoriesController(
  server: FastifyInstance,
  categoriesService: CategoriesService
) {
  server.get(CATEGORIES, async (request, reply) => {
    try {
      return categoriesService.getAllCategories();
    } catch {
      reply.code(500).send({ error: "Error in getting data" });
    }
  });

  server.delete<CategoryDelete>(
    CATEGORIES,
    { preHandler: [authGuard] },
    async (request, reply) => {
      try {
        const { id } = request.body;
        return categoriesService.deleteCategory(id);
      } catch {
        reply.code(500).send({ error: "Error in deleting data" });
      }
    }
  );

  server.post<CategoryPost>(
    CATEGORIES,
    { preHandler: [authGuard] },
    async (request, reply) => {
      try {
        const { name } = JSON.parse(request.body)

        const checkedName = escapeString(name);

        await categoriesService.createCategory({
          name: checkedName,
        });

        return { message: "Category created successfully" };
      } catch (error) {
        reply.code(500).send({ error: "An error occurred" });
      }
    }
  );
}
