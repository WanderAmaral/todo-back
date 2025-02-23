import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getAllTasks } from "../../functions/get-all-tasks";

export const getTasksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/tasks", async () => {
    const tasks = await getAllTasks();
    return tasks;
  });
};
