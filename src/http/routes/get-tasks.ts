import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const getTasks: FastifyPluginAsyncZod = async (app) => {
  app.get("/tasks", async (request, reply) => {
    return reply.send({ message: "Hello World" });
  });
};
