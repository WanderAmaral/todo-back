import prisma from "../lib/prisma";
import { hashPassword } from "../utils/hash";

interface User {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: User) => {
  const hashedPassowrd = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassowrd,
    },
  });

  return user;
};
