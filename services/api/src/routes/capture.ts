import type { CaptureJob } from "@yaya/contracts";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const captureRequest = z.object({ url: z.string().url() });

export async function registerCaptureRoutes(app: FastifyInstance): Promise<void> {
  app.post("/v1/capture-jobs", async (request, reply) => {
    captureRequest.parse(request.body);
    const job: CaptureJob = {
      jobId: crypto.randomUUID(),
      status: "queued",
      attempt: 1,
      createdAt: new Date().toISOString(),
    };
    return reply.status(202).send(job);
  });
}
