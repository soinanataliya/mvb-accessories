import { FastifyInstance, RouteGenericInterface } from "fastify";
import { Knex } from 'knex';

const ACCESSORIES = '/accessories'

interface AccessoryDelete extends RouteGenericInterface {
    Body: { id: string }
}

export function useAccessoriesController (server: FastifyInstance, dbConnection: Knex) {
	server.get(ACCESSORIES, async (req, res) => {
		return dbConnection('acc').select();
    });
    server.delete<AccessoryDelete>(ACCESSORIES, async (req, res) => {
        const { id } = req.body;
        dbConnection('acc').del().where({
            id,
          });
        return `id ${id} удален`;
    });
}