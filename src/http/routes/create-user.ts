import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import prisma from "../../lib/prisma";
import z from "zod";
import { hashPassword } from "../../utils/hash";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  app.post("/user", async (request, reply) => {
    const { name, email, password } = createUserSchema.parse(request.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ message: "User already exists" });
    }

    const hashedPassowrd = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassowrd,
      },
    });

    return reply.status(201).send(user);
  });
};
