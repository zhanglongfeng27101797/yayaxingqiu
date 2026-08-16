# API 契约｜微信小程序 V1

> 目标：前后端可并行开发。字段名、枚举和错误处理优先以本文件及 `packages/contracts` 为准。

## 1. 通用约定

- 基础路径：`/v1`
- 内容类型：`application/json`
- 鉴权：`Authorization: Bearer <accessToken>`
- 创建任务和生成草稿：支持 `Idempotency-Key`
- 时间：ISO 8601 UTC
- 列表：`cursor + limit`
- 错误包络：`code`、`message`、`requestId`、`details`
- 所有资源默认按 `tenantId + userId` 隔离。
- 前端不得直接调用第三方平台解析、ASR、模型和微信 `code2Session` 服务。

## 2. 通用错误结构

```json
{
  "code": "INVALID_INPUT",
  "message": "链接格式不正确",
  "requestId": "req_01",
  "details": {
    "field": "url"
  }
}
```

## 3. 微信登录

### POST `/auth/wechat`

用途：小程序调用 `wx.login()` 后，把临时 `code` 交给服务端换取业务会话。

请求：

```json
{
  "code": "wx_login_temp_code"
}
```

响应：

```json
{
  "accessToken": "business_access_token",
  "expiresIn": 7200,
  "user": {
    "id": "usr_01",
    "nickname": "小雨妈妈",
    "profileCompleted": true
  }
}
```

规则：

- 服务端内部调用微信 `code2Session`。
- 不向小程序返回 `session_key`、AppSecret。
- code 失效返回 `WECHAT_LOGIN_CODE_INVALID`。

## 4. 创作者资料

### GET `/me/profile`

响应：

```json
{
  "id": "profile_01",
  "nickname": "小雨妈妈",
  "creatorDirections": ["育儿经验", "辅食"],
  "babyAgeMonths": 8,
  "tonePreference": "natural_chat",
  "willingToAppear": true,
  "updatedAt": "2026-08-16T12:00:00Z"
}
```

### PATCH `/me/profile`

请求字段均可选，只传修改项：

```json
{
  "nickname": "小雨妈妈",
  "creatorDirections": ["育儿经验", "辅食"],
  "babyAgeMonths": 8,
  "tonePreference": "natural_chat",
  "willingToAppear": true
}
```

## 5. 首页聚合

### GET `/home`

响应示意：

```json
{
  "recommendedTopic": {
    "id": "topic_01",
    "title": "宝宝睡觉总哼唧，需要管吗？",
    "stars": 5,
    "starLabel": "值得拍",
    "why": "这个问题很多新手妈妈都会搜，而且更适合用真实观察来讲。",
    "tags": ["睡眠", "判断解惑"],
    "difficulty": "easy"
  },
  "moreTopics": [],
  "creationSummary": {
    "publishCount": 6,
    "likeCount": 3200,
    "streakDays": 5,
    "dataStatus": "sample"
  },
  "recentDrafts": [],
  "academyRecommendation": null
}
```

`dataStatus`：`live | snapshot | sample | unavailable`。

## 6. 选题

### GET `/topics`

Query：

- `q`：关键词，可选
- `structure`：可选
- `difficulty`：可选
- `cursor`：可选
- `limit`：默认 20，最大 50

### GET `/topics/{id}`

响应至少包含：

```json
{
  "id": "topic_01",
  "title": "宝宝睡觉总哼唧，需要管吗？",
  "category": "睡眠",
  "structure": "judgement",
  "stars": 5,
  "starLabel": "值得拍",
  "why": "...",
  "creatorFit": "high",
  "creationSpace": "large",
  "difficulty": "easy",
  "crowding": "medium",
  "medicalRisk": "medium",
  "platformRisk": "low",
  "directions": [
    {"id": "dir_01", "label": "判断解惑", "recommended": true},
    {"id": "dir_02", "label": "经验复盘", "recommended": false},
    {"id": "dir_03", "label": "避坑纠错", "recommended": false}
  ]
}
```

### POST `/topics/{id}/adapt`

用于三星题改造成宝妈可拍切口。

请求：

```json
{
  "angle": "real_experience"
}
```

`angle`：`real_experience | what_i_wanted_to_know | concrete_scene`。

## 7. 创作配置与开头

### POST `/creation-options/hooks`

请求：

```json
{
  "sourceType": "topic",
  "sourceId": "topic_01",
  "direction": "judgement",
  "excludeHookIds": ["hook_01", "hook_02", "hook_03"]
}
```

响应：

```json
{
  "hooks": [
    {"id": "hook_04", "text": "宝宝睡觉总哼唧，很多妈妈第一反应其实都做反了。"},
    {"id": "hook_05", "text": "我家宝宝有段时间一睡觉就哼唧，我后来才知道先看这三件事。"},
    {"id": "hook_06", "text": "睡觉哼唧要不要管，不要先猜，先看宝宝这几个状态。"}
  ]
}
```

规则：新一组不得只重排旧 hook。

## 8. 生成脚本

### POST `/script-drafts/generate`

请求：

```json
{
  "sourceType": "topic",
  "sourceId": "topic_01",
  "direction": "judgement",
  "hookId": "hook_05",
  "tone": "natural_chat"
}
```

`sourceType`：`topic | benchmark`。

`tone`：

- `natural_chat`
- `real_experience`
- `clear_professional`
- `light_conflict`

响应：

```json
{
  "id": "draft_01",
  "sourceType": "topic",
  "sourceId": "topic_01",
  "title": "宝宝睡觉总哼唧，需要管吗？",
  "direction": "judgement",
  "tone": "natural_chat",
  "opening": "我家宝宝有段时间一睡觉就哼唧，我后来才知道先看这三件事。",
  "body": "...",
  "ending": "...",
  "advice": ["建议用宝宝睡觉前后的真实生活画面做辅助"],
  "version": 1,
  "updatedAt": "2026-08-16T12:00:00Z"
}
```

核心规则：

- 生成只能读取当前 `sourceType + sourceId`。
- 缺当前来源关键信息必须失败，禁止从其他题或其他稿件兜底。
- direction/tone/hook 必须真实影响结果。

## 9. 草稿

### GET `/script-drafts`

Query：`cursor`、`limit`。

### GET `/script-drafts/{id}`

### PATCH `/script-drafts/{id}`

请求：

```json
{
  "title": "...",
  "opening": "...",
  "body": "...",
  "ending": "...",
  "version": 3
}
```

若 version 冲突：HTTP 409 + `VERSION_CONFLICT`。

### POST `/script-drafts/{id}/optimize`

请求：

```json
{
  "target": "opening",
  "mode": "more_conversational"
}
```

`mode`：`more_conversational | shorter | more_hooking`。

### POST `/script-drafts/{id}/opening-options`

返回 3 个新开头，用户选择后再 PATCH 草稿；接口本身不直接覆盖原开头。

## 10. 采集任务

### POST `/capture-jobs`

请求：

```json
{
  "url": "https://example.com/video-link"
}
```

响应：

```json
{
  "jobId": "job_capture_01",
  "status": "queued",
  "attempt": 0,
  "progress": 0,
  "resultId": null,
  "lastError": null
}
```

### GET `/capture-jobs/{id}`

响应统一任务结构：

```json
{
  "jobId": "job_capture_01",
  "status": "transcribing",
  "attempt": 1,
  "progress": 65,
  "resultId": null,
  "lastError": null,
  "updatedAt": "2026-08-16T12:00:00Z"
}
```

### POST `/capture-jobs/{id}/retry`

### POST `/capture-jobs/{id}/cancel`

规则：

- 每次正常采集创建独立资源。
- 相同 `Idempotency-Key` 重放返回原任务，不重复创建。

## 11. 对标

### GET `/benchmarks`

Query：

- `sourceType=user_capture|yaya_pick|legacy_snapshot`
- `q`
- `cursor`
- `limit`

### GET `/benchmarks/{id}`

响应至少包含：

```json
{
  "id": "bench_01",
  "sourceType": "user_capture",
  "sourceLabel": "我的采集",
  "title": "...",
  "author": "...",
  "category": "辅食",
  "structure": "process_list",
  "stars": 5,
  "metrics": {
    "views": 120000,
    "likes": 8500,
    "favorites": 4200,
    "comments": 630,
    "capturedAt": "2026-08-16T10:00:00Z"
  },
  "whyLearn": ["场景具体", "开头直接", "结构好模仿"],
  "oneLine": "...",
  "hook": "...",
  "hookReason": "...",
  "flow": ["痛点", "判断", "步骤", "结尾"],
  "points": ["...", "...", "..."],
  "transcriptExcerpt": "...",
  "transcriptAvailable": true,
  "remixWarnings": ["不要照抄原话"]
}
```

### GET `/benchmarks/{id}/transcript`

用于展开完整逐字稿，避免大文本塞进列表/首屏详情。

## 12. 逐字稿任务

### POST `/transcript-jobs`

请求支持：

```json
{
  "url": "https://example.com/video-link"
}
```

或后续扩展：`benchmarkId`。

### GET `/transcript-jobs/{id}`

成功时 `resultId` 指向 Transcript。

## 13. 视频分析任务

### POST `/analysis-jobs`

请求：

```json
{
  "url": "https://example.com/video-link"
}
```

或：

```json
{
  "benchmarkId": "bench_01"
}
```

### GET `/analysis-jobs/{id}`

成功后 resultId 指向可展示的 benchmark/analysis result。

## 14. 商学苑

### GET `/academy/feed`

Query：

- `problem=dont_know_what_to_shoot|cant_write_script|cant_shoot|low_traffic|start_selling`
- `contentType=course|share|replay|ops_pick|platform_rule|tool_tutorial`

响应：

```json
{
  "problem": "cant_write_script",
  "recommendation": {
    "id": "academy_01",
    "contentType": "ops_pick",
    "title": "为什么你的前 3 秒总留不住人？",
    "summary": "..."
  },
  "sections": [
    {"key": "courses", "title": "系统课程", "items": []},
    {"key": "shares", "title": "本周分享 / 直播回放", "items": []},
    {"key": "ops", "title": "运营精选", "items": []},
    {"key": "latest", "title": "最新内容", "items": []}
  ]
}
```

### GET `/academy/content/{id}`

## 15. 错误码

| 错误码 | HTTP | 小程序处理 |
| --- | --- | --- |
| `AUTH_REQUIRED` | 401 | 清理业务会话，重新 `wx.login` |
| `WECHAT_LOGIN_CODE_INVALID` | 401/400 | 重新获取 code |
| `FORBIDDEN` | 403 | 提示无权限 |
| `INVALID_INPUT` | 400 | 定位字段并保留用户输入 |
| `UNSUPPORTED_URL` | 400 | 提示支持的平台和链接形式 |
| `PLATFORM_RATE_LIMITED` | 429 | 显示稍后重试 / retryAfter |
| `MEDIA_UNAVAILABLE` | 422 | 更换链接或重试 |
| `TRANSCRIPT_FAILED` | 422/500 | 展示可重试性 |
| `ANALYSIS_FAILED` | 422/500 | 保留已有结果，允许单独重试 |
| `CONTENT_RISK_BLOCKED` | 422 | 展示安全原因和可改编方向 |
| `SOURCE_INCOMPLETE` | 422 | 禁止跨题兜底，提示当前来源不足 |
| `VERSION_CONFLICT` | 409 | 处理草稿版本冲突 |
| `NOT_FOUND` | 404 | 空态或返回上一层 |
| `CONFLICT` | 409 | 非法状态转换 |
| `RATE_LIMITED` | 429 | 展示配额和恢复时间 |
| `INTERNAL_ERROR` | 500 | 展示 requestId，可重试 |

## 16. 前后端冻结要求

在正式并行开发前，至少把以下 DTO 同步进 `packages/contracts` 或 OpenAPI：

- WeChatAuthRequest / Response
- CreatorProfile
- HomeResponse
- TopicSummary / TopicDetail
- CreationDirection / HookOption / Tone
- GenerateScriptDraftRequest / ScriptDraft
- CaptureJob / TranscriptJob / AnalysisJob
- BenchmarkSummary / BenchmarkDetail / Transcript
- AcademyFeed / AcademyContent
- ApiError

如果字段需要调整，先改契约 PR，再改前后端实现，避免双方各自猜字段。
