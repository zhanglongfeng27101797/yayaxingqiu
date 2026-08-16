import type { CaptureJob } from "@yaya/contracts";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const captureRequest = z.object({ url: z.string().url() });

/**
 * SKELETON ONLY.
 * This route currently demonstrates the target HTTP shape; it does not yet
 * persist to PostgreSQL or enqueue a real Worker job.
 */
export async function registerCaptureRoutes(app: FastifyInstance): Promise<void> {
  app.post("/v1/capture-jobs", async (request, reply) => {
    captureRequest.parse(request.body);
    const job: CaptureJob = {
      jobId: crypto.randomUUID(),
      status: "queued",
      attempt: 0,
      progress: 0,
      createdAt: new Date().toISOString(),
      resultId: null,
      lastError: null,
    };
    return reply.status(202).send(job);
  });
}
