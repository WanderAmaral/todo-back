import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import prisma from "../../lib/prisma";
import z from "zod";
import { verifyPassword } from "../../utils/hash";

export const loginRoute: FastifyPluginAsyncZod = async (app) => {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  app.post("/login", async (request, reply) => {
    const { email, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return reply.status(400).send({ message: "User not found" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return reply.status(400).send({ message: "Invalid Password" });
    }

    const token = app.jwt.sign({ id: user.id, email: user.email });

    return reply.status(200).send({ token });
  });
};
