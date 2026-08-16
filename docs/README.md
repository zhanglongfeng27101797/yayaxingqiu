# 文档中心｜微信小程序 V1

## 产品

- [产品需求](product/product-requirements.md)
- [完整页面规格](product/page-specification.md)
- [用户流程与页面地图](product/user-flows.md)

## 技术

- [系统架构](technical/architecture.md)
- [数据模型](technical/data-model.md)
- [API 契约](technical/api-contract.md)

## 研发交付

- [V1 范围冻结](delivery/v1-scope-freeze.md)
- [研发需求与分工](delivery/requirements-and-ownership.md)
- [测试、发布与验收](delivery/acceptance-and-release.md)
- [来源与决策记录](delivery/source-and-decisions.md)

## 阅读顺序

### 前端

1. 产品需求
2. 完整页面规格
3. 用户流程
4. V1 范围冻结
5. API 契约
6. 测试与验收

### 后端

1. 系统架构
2. 数据模型
3. API 契约
4. 用户流程
5. V1 范围冻结
6. 研发分工

## 当前正式工程方向

- 正式产品：**微信小程序**。
- 正式前端目录：`apps/miniprogram`（待小程序前端初始化）。
- `apps/mobile` 中旧 Flutter 工程仅为历史 Demo / 交互参考，不作为正式前端技术路线。
- 服务端正式代码继续位于 `services/api`，后续异步任务位于 `services/worker`。

当历史文件与当前文档冲突时，以 [来源与决策记录](delivery/source-and-decisions.md) 的冲突裁决顺序为准。
