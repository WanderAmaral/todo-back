import prisma from "../lib/prisma";

interface CreateTaskRequest {
  title: string;
  userId: string;
  completed?: boolean;
  createdAt?: Date;
}

export async function createTask({
  title,
  userId,
  completed = false,
  createdAt,
}: CreateTaskRequest) {
  const insertData = await prisma.tasks.create({
    data: {
      title: title,
      completed: completed,
      userId: userId,
      createdAt: createdAt ? new Date(createdAt) : undefined,
    },
  });
  return insertData;
}
