# API 契约

## 通用约定

- 基础路径：`/v1`
- 内容类型：`application/json`
- 鉴权：`Authorization: Bearer <token>`
- 创建任务和生成草稿：支持 `Idempotency-Key`
- 时间：ISO 8601 UTC
- 列表：`cursor + limit`，不使用不稳定的页码分页
- 错误包络：`code`、`message`、`requestId`、`details`

## 接口清单

| 方法 | 路径 | 用途 | 模式 |
| --- | --- | --- | --- |
| GET/PATCH | `/me/profile` | 获取或更新创作者资料 | 同步 |
| GET | `/home` | 首页聚合 | 同步 |
| GET | `/topics`、`/topics/{id}` | 选题列表和详情 | 同步 |
| POST | `/topics/{id}/adapt` | 创建安全改编配置 | 同步 |
| POST | `/capture-jobs` | 创建采集任务 | 异步、幂等 |
| GET | `/capture-jobs/{id}` | 查询采集状态和结果 | 同步 |
| POST | `/capture-jobs/{id}/retry` | 重试可恢复失败 | 异步、幂等 |
| POST | `/capture-jobs/{id}/cancel` | 取消非终态任务 | 同步 |
| GET | `/benchmarks`、`/benchmarks/{id}` | 对标列表和详情 | 同步 |
| POST/DELETE | `/benchmarks/{id}/favorite` | 收藏或取消收藏 | 同步、幂等 |
| POST/GET | `/transcript-jobs`、`/transcript-jobs/{id}` | 创建并查询逐字稿任务 | 异步 |
| POST/GET | `/analysis-jobs`、`/analysis-jobs/{id}` | 创建并查询拆解任务 | 异步 |
| POST | `/script-drafts/generate` | 按来源、方向和口吻生成草稿 | 幂等 |
| GET | `/script-drafts` | 草稿列表 | 同步 |
| GET/PATCH | `/script-drafts/{id}` | 获取或保存草稿 | 同步、版本冲突检测 |
| POST | `/script-drafts/{id}/optimize` | 优化或生成新开头 | 幂等 |
| GET | `/academy/feed` | 成长内容 Feed | 同步 |
| GET | `/academy/content/{id}` | 成长内容详情 | 同步 |

## 错误码

| 错误码 | 建议 HTTP 状态 | 客户端处理 |
| --- | --- | --- |
| `AUTH_REQUIRED` | 401 | 清理无效会话并登录 |
| `FORBIDDEN` | 403 | 提示无权限，不暴露资源详情 |
| `INVALID_INPUT` | 400 | 定位字段并保留用户输入 |
| `UNSUPPORTED_URL` | 400 | 提示支持的平台和链接形式 |
| `PLATFORM_RATE_LIMITED` | 429 | 展示稍后重试和 retryAfter |
| `MEDIA_UNAVAILABLE` | 422 | 允许更换链接或重试 |
| `TRANSCRIPT_FAILED` | 422/500 | 展示可重试性 |
| `ANALYSIS_FAILED` | 422/500 | 保留逐字稿，允许单独重试分析 |
| `CONTENT_RISK_BLOCKED` | 422 | 展示安全原因和可改编方向 |
| `NOT_FOUND` | 404 | 空态或返回上一层 |
| `CONFLICT` | 409 | 处理版本冲突或非法状态转换 |
| `RATE_LIMITED` | 429 | 展示配额和恢复时间 |
| `INTERNAL_ERROR` | 500 | 展示 requestId，允许重试 |

## 任务响应示例

```json
{
  "jobId": "job_01",
  "status": "transcribing",
  "attempt": 1,
  "progress": 65,
  "resultId": null,
  "lastError": null,
  "requestId": "req_01"
}
```

