import prisma from "../lib/prisma";

export const deleteTask = async (taskId: string) => {
  try {
    return await prisma.tasks.delete({
      where: { id: taskId },
    });
  } catch (error) {
    console.error("Erro ao deletar task:", error);
    throw new Error("Erro ao deletar tarefa");
  }
};
