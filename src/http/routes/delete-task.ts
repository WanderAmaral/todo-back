import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { deleteTask } from "../../functions/delete-task";

export const deleteTaskRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/delete-task/:taskId",
    {
      schema: {
        params: z.object({
          taskId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { taskId } = request.params;

      try {
        await deleteTask(taskId);
        return reply.status(200).send({ message: "Tarefa deletada com sucesso!" });
      } catch (error) {
        console.error("Erro ao deletar task:", error);
        return reply.status(500).send({ message: "Erro ao deletar tarefa" });
      }
    }
  );
};
