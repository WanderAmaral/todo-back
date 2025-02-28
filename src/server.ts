import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { createTaskRoute } from "./http/routes/create-task";
import { getTasksRoute } from "./http/routes/get-tasks-user";
import { createUserRoute } from "./http/routes/create-user";
import fastifyJWT from "@fastify/jwt";
import { loginRoute } from "./http/routes/login";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Typed API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastifyJWT, {
  secret: "secret",
});

//User Routes
app.register(createUserRoute);
app.register(loginRoute);
// Tasks Routes
app.register(getTasksRoute);
app.register(createTaskRoute);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server runnig!");
});
