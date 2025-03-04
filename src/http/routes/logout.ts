import type { FastifyPluginAsync } from "fastify";

export const logoutRoute: FastifyPluginAsync = async (app) => {
  app.post("/logout", async (request, reply) => {
    return reply.status(200).send({ message: "Logout realizado com sucesso" });
  });
};
