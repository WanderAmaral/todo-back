import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createTask } from "../../functions/create-task";

export const createTaskRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/create-task",
    {
      schema: {
        body: z.object({
          title: z.string().min(3).max(255),
          completed: z.boolean().optional(),
          createdAt: z.date().optional(),
          userId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { title, completed, createdAt, userId } = request.body;

      const task = await createTask({
        userId,
        title,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        completed,
      });
      return reply.status(201).send(task);
    }
  );
};
