import assert from "node:assert";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../modules/auth/auth.controller.js";

export const authGuard = (
  req: FastifyRequest,
  res: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  const token = req.cookies.session;
  assert(token, Error("Forbidden"));
  try {
    const decodedSession = jwt.verify(token, JWT_SECRET);
    req.session = decodedSession;
    done();
  } catch {
    throw Error("Forbidden");
  }
};
