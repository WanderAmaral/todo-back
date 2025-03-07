import prisma from "../lib/prisma";

export const getUserTasks = async (userId: string) => {
  const result = await prisma.tasks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  return result;
};
