# API 服务｜当前为工程骨架

> ⚠️ 本目录目前不是完整后端实现。文件/路由存在 **不等于功能已经完成**。

正式目标契约请先看：

- `docs/technical/api-contract.md`
- `docs/technical/data-model.md`
- `docs/technical/architecture.md`
- `docs/delivery/current-implementation-status.md`

## 当前已经有的内容

- Fastify / TypeScript 基础工程；
- health 路由；
- topics / capture / scripts 等少量示意路由；
- Zod 参数校验示例；
- `@yaya/contracts` 基础共享类型。

## 当前明确没有完成

- 微信 `wx.login` → code2Session → 业务会话；
- PostgreSQL schema / migration / repository；
- 鉴权和 tenantId + userId 数据隔离；
- Worker/队列；
- 对象存储；
- 平台真实解析；
- ASR；
- AI 脚本生成与 Prompt 服务；
- Analysis；
- Benchmark / Transcript / Academy 等完整正式路由；
- 幂等、审计、限流、监控的完整实现。

## 现有示意路由的解释

- `GET /v1/topics`：目前可以是空数据骨架；
- `POST /v1/capture-jobs`：目前只返回符合目标 DTO 的示意 queued job，**未入库、未进队列**；
- `POST /v1/script-drafts/generate`：当前明确返回 503“生成服务尚未配置”，只用于冻结请求形状。

## 后端开发原则

1. 先补齐 contracts/OpenAPI，再并行联调；
2. 现有骨架与 API 契约冲突时，按当前文档修骨架，不反向削弱需求；
3. AppSecret、session_key、第三方平台/ASR/AI 密钥只在服务端管理；
4. 长任务统一经 Worker/队列，不依赖小程序前台常驻；
5. 功能完成标准以 `acceptance-and-release.md` 为准。
