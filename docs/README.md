# 文档中心｜微信小程序 V1

> 新同事不要只看某一份 PRD 或某一个代码目录。**范围、交互、技术和完成度分别有对应真源。**

## 最先看

1. [来源与架构决策](delivery/source-and-decisions.md)：冲突时谁优先；
2. [V1 范围冻结](delivery/v1-scope-freeze.md)：P0/P1/P2 和明确不做；
3. [当前实现状态](delivery/current-implementation-status.md)：哪些代码真的已经有，哪些只是骨架/规划。

## 产品

- [产品需求](product/product-requirements.md)
- [完整页面规格](product/page-specification.md)
- [用户流程与页面地图](product/user-flows.md)

## 技术

- [系统架构](technical/architecture.md)
- [微信小程序平台边界](technical/wechat-platform-boundaries.md)
- [数据模型](technical/data-model.md)
- [API 契约](technical/api-contract.md)

## 研发交付

- [V1 范围冻结](delivery/v1-scope-freeze.md)
- [当前实现状态](delivery/current-implementation-status.md)
- [研发需求与分工](delivery/requirements-and-ownership.md)
- [测试、发布与验收](delivery/acceptance-and-release.md)
- [来源与决策记录](delivery/source-and-decisions.md)

## 历史参考

- [`reference/demo-v1.0`](../reference/demo-v1.0/README.md)：旧 APK/WebView Demo 的页面样式和已知错误，只供参考；
- [`apps/mobile`](../apps/mobile/README.md)：旧 Flutter 工程骨架，只作历史原型。

以上两类**都不是正式前端开发入口**。

## 阅读顺序

### 前端

1. 来源与架构决策
2. V1 范围冻结
3. 产品需求
4. 完整页面规格
5. 用户流程
6. 微信小程序平台边界
7. API 契约
8. 当前实现状态
9. 测试与验收

### 后端

1. 来源与架构决策
2. V1 范围冻结
3. 系统架构
4. 数据模型
5. API 契约
6. 当前实现状态
7. 用户流程
8. 研发分工

## 当前正式工程方向

- 正式产品：**微信小程序**。
- 正式前端目录：`apps/miniprogram`；当前只有入口说明，真实工程待 M0 初始化。
- `apps/mobile` 中旧 Flutter 工程仅为历史原型，不作为正式前端技术路线。
- `services/api` 当前是 TypeScript/Fastify 工程骨架，部分路由为 Mock/空数据/503，不能按“文件存在”判断完成。
- `services/worker` 是目标目录，当前尚未初始化真实 Worker。
- 数据库、对象存储、微信登录、平台解析、ASR、AI 生成/拆解均需按当前架构正式实现。

发生冲突时，以 [来源与架构决策](delivery/source-and-decisions.md) 的**分类型冲突裁决规则**为准。
