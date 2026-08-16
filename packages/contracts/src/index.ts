// Shared contracts are the API boundary types, not database entity definitions.
// Keep benchmark source and draft source as two distinct concepts.

export type BenchmarkSourceType = "user_capture" | "yaya_pick" | "legacy_snapshot";
export type DraftSourceType = "topic" | "benchmark";
export type Tone = "natural_chat" | "real_experience" | "clear_professional" | "light_conflict";

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
  id: string;
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
  progress: number;
  createdAt: string;
  updatedAt?: string;
  resultId: string | null;
  lastError: ApiErrorBody | null;
}

export interface GenerateScriptDraftRequest {
  sourceType: DraftSourceType;
  sourceId: string;
  direction: string;
  hookId: string;
  tone: Tone;
}

export interface ScriptDraft {
  id: string;
  sourceType: DraftSourceType;
  sourceId: string;
  title: string;
  direction: string;
  tone: Tone;
  opening: string;
  body: string;
  ending: string;
  advice: string[];
  version: number;
  updatedAt: string;
}
