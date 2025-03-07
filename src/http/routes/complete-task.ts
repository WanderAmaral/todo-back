import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import prisma from "../../lib/prisma";

export const completeTaskRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/complete-task/:taskId",
    {
      schema: { params: z.object({ taskId: z.string() }) },
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (error) {
          return reply.status(401).send({ message: "Token inválido" });
        }
      },
    },
    async (request, reply) => {
      const { taskId } = request.params;
      const userId = request.user.id;

      const task = await prisma.tasks.updateMany({
        where: {
          id: taskId,
          userId, 
        },
        data: {
          completed: true,
        },
      });

      if (!task.count) {
        return reply.status(404).send({ message: "Tarefa não encontrada" });
      }

      return reply.send({ message: "Tarefa completada com sucesso!" });
    }
  );
};
