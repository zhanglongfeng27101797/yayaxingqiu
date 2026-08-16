import type { FastifyInstance } from "fastify";
import { z } from "zod";

const generateRequest = z.object({
  sourceType: z.enum(["topic", "benchmark"]),
  sourceId: z.string().min(1),
  direction: z.string().min(1),
  hookId: z.string().min(1),
  tone: z.enum(["natural_chat", "real_experience", "clear_professional", "light_conflict"]),
});

/**
 * SKELETON ONLY.
 * The request shape follows docs/technical/api-contract.md, but the real
 * generation provider, source loading, safety review and persistence are not
 * implemented yet.
 */
export async function registerScriptRoutes(app: FastifyInstance): Promise<void> {
  app.post("/v1/script-drafts/generate", async (request, reply) => {
    generateRequest.parse(request.body);
    return reply.status(503).send({
      code: "GENERATION_PROVIDER_UNAVAILABLE",
      message: "生成服务尚未配置",
      requestId: request.id,
    });
  });
}
