import prisma from "../utils/prisma";

export const getAllTasks = async () => {
  const result = await prisma.tasks.findMany({});

  return result;
};
