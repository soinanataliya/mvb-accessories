import assert from "node:assert";
import { FastifyInstance, RouteGenericInterface } from "fastify";
import jwt from "jsonwebtoken";

const ERROR = "Auth error";
export const JWT_SECRET = "secret";
const cookieName = "session";

const MOCK_USERS: Array<{
  login: string;
  passwordHash: string;
}> = [
  {
    login: "admin",
    passwordHash: "admin",
  },
];

interface LoginInterface extends RouteGenericInterface {
  Body: {
    login: string;
    password: string;
  };
}

const encodePassword = (password: string): string => password;

export function useAuthController(server: FastifyInstance) {
  server.post<LoginInterface>("/login", async (req, res) => {
    const { login, password } = req.body;
    const user = MOCK_USERS.find((user) => user.login === login);
    assert(!!user, Error(ERROR));
    assert(user.passwordHash === encodePassword(password), Error(ERROR));
    const token = jwt.sign({ login: user.login }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.setCookie(cookieName, token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });
  });

  server.post("/logout", async (req, res) => {
    res.clearCookie(cookieName, { path: "/api" });
  });
}
