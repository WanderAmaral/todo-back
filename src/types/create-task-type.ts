import zod from "zod";

export const createTaskType = zod.object({
  body: zod.object({
    title: zod.string(),
    description: zod.string(),
  }),
});
