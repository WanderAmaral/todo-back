import prisma from "../lib/prisma";

export const getAllTasks = async () => {
  const result = await prisma.tasks.findMany({});

  return result;
};
