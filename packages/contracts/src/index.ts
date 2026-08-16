export type SourceType = "user_capture" | "yaya_pick" | "legacy_snapshot";

export type JobStatus =
  | "queued"
  | "parsing"
  | "downloading"
  | "transcribing"
  | "reviewing"
  | "analyzing"
  | "persisting"
  | "succeeded"
  | "retriable_failed"
  | "failed"
  | "cancelled";

export interface ApiErrorBody {
  code: string;
  message: string;
  requestId: string;
  details?: Record<string, unknown>;
}

export interface TopicSummary {
  topicId: string;
  title: string;
  category: string;
  stars: number;
  reason: string;
  medicalRisk: "low" | "medium" | "high";
}

export interface CaptureJob {
  jobId: string;
  status: JobStatus;
  attempt: number;
  createdAt: string;
  resultId?: string;
}

export interface ScriptDraft {
  draftId: string;
  sourceType: "topic" | "benchmark";
  sourceId: string;
  direction: string;
  tone: string;
  opening: string;
  body: string;
  ending: string;
  version: number;
}
