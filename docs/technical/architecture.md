# 系统架构

```mermaid
flowchart LR
    Mobile[Flutter / Dart] --> Gateway[TypeScript API / BFF]
    Gateway --> Auth[认证与租户隔离]
    Gateway --> Domain[选题 / 对标 / 草稿 / 成长]
    Gateway --> Queue[任务队列]
    Queue --> Worker[TypeScript Worker]
    Worker --> Platform[平台适配器]
    Worker --> AI[ASR / 生成 / 分析]
    Domain --> PG[(PostgreSQL)]
    Worker --> PG
    Worker --> OSS[(对象存储)]
    Gateway --> Observe[日志 / 指标 / 告警]
    Admin[运营后台] --> Domain
    Admin -. 导入导出 .-> Feishu[飞书]
```

## 工程边界

- `apps/mobile`：Flutter 页面、导航、状态管理、接口接入、安全存储和本地草稿体验。
- `services/api`：HTTP 契约、鉴权、聚合、校验、幂等、错误处理和任务创建。
- `services/worker`：后续承载链接解析、媒体处理、ASR、审核、分析与重试。
- `packages/contracts`：前后端共享的 TypeScript 契约、枚举和错误结构。

## 异步任务状态

```mermaid
stateDiagram-v2
    [*] --> queued
    queued --> parsing
    parsing --> downloading
    downloading --> transcribing
    transcribing --> reviewing
    reviewing --> analyzing
    analyzing --> persisting
    persisting --> succeeded
    queued --> retriable_failed
    parsing --> retriable_failed
    downloading --> retriable_failed
    transcribing --> retriable_failed
    analyzing --> retriable_failed
    retriable_failed --> queued: retry
    queued --> cancelled
    parsing --> cancelled
    downloading --> failed
    reviewing --> failed
    succeeded --> [*]
    failed --> [*]
    cancelled --> [*]
```

任务必须保存 `attempt`、租约、最后错误、开始/结束时间和结果 ID。终态不能回退，重试必须生成新租约并递增尝试次数。

## 安全与可观测性

- Bearer Token 进入 iOS Keychain 或 Android Keystore。
- 所有查询以 `tenantId + userId` 作为隔离边界。
- 创建任务和生成草稿必须支持 `Idempotency-Key`。
- 媒体使用短期签名 URL，并配置生命周期与删除审计。
- 日志只记录 requestId、错误码、耗时和必要元数据，不记录完整正文和密钥。

