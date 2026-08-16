import cors from "@fastify/cors";
import Fastify, { type FastifyInstance } from "fastify";
import { ZodError } from "zod";

import { config } from "./config.js";
import { registerCaptureRoutes } from "./routes/capture.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerScriptRoutes } from "./routes/scripts.js";
import { registerTopicRoutes } from "./routes/topics.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: { level: config.LOG_LEVEL } });
  await app.register(cors, { origin: false });

  app.setErrorHandler((error, request, reply) => {
    const invalidInput = error instanceof ZodError;
    const statusCode = invalidInput ? 400 : 500;
    void reply.status(statusCode).send({
      code: invalidInput ? "INVALID_INPUT" : "INTERNAL_ERROR",
      message: invalidInput ? "请求参数不符合接口契约" : "服务暂时不可用",
      requestId: request.id,
      ...(invalidInput ? { details: { issues: error.issues } } : {}),
    });
  });

  await registerHealthRoutes(app);
  await registerTopicRoutes(app);
  await registerCaptureRoutes(app);
  await registerScriptRoutes(app);
  return app;
}
