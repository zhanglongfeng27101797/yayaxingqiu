import type { TopicSummary } from "@yaya/contracts";
import type { FastifyInstance } from "fastify";

const topics: TopicSummary[] = [];

export async function registerTopicRoutes(app: FastifyInstance): Promise<void> {
  app.get("/v1/topics", async () => ({ items: topics, nextCursor: null }));
}
