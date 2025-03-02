import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUserTasks } from "../../functions/get-tasks-user";

export const getTasksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/tasks",
    {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ message: "Unauthorized" });
        }
      },
    },
    async (request, reply) => {
      const userId = request.user.id;

      if (!userId) {
        return reply.status(401).send({ message: "User not authenticated" });
      }

      const tasks = await getUserTasks(userId);
      return reply.status(200).send(tasks);
    }
  );
};
