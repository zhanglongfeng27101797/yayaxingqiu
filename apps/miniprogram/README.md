# 微信小程序正式前端目录

> **这是正式前端开发入口。** 当前只建立目录与研发边界，M0 尚未初始化真实小程序工程。

正式产品平台固定为微信小程序。前端开始业务开发前，应先完成技术评审并在本目录初始化工程。

## 默认技术方案

默认：**微信原生小程序 + TypeScript**。

如果公司前端已有统一、成熟的 Taro / uni-app 技术栈，可以在 M0 技术评审时决定替换实现层；一旦决定，应更新 `docs/delivery/source-and-decisions.md` 并冻结，后续不要在同一项目混用两套前端框架。

## M0 最低交付

- 可被微信开发者工具正常打开的工程；
- `app.ts / app.json / app.wxss`；
- 五个 TabBar：首页｜创作｜对标｜成长｜我的；
- 环境配置：dev / test / prod；
- API client 与业务会话处理；
- `wx.login` 登录接入；
- 通用 loading / empty / error / offline 状态组件；
- 基础埋点和错误上报接口；
- 项目运行与体验版上传说明。

## 开发前必须阅读

1. `docs/delivery/source-and-decisions.md`
2. `docs/delivery/v1-scope-freeze.md`
3. `docs/product/product-requirements.md`
4. `docs/product/page-specification.md`
5. `docs/product/user-flows.md`
6. `docs/technical/architecture.md`
7. `docs/technical/api-contract.md`
8. `docs/delivery/current-implementation-status.md`

## 不要做

- 不要基于 `apps/mobile` 继续写正式业务；
- 不要把历史 APK/WebView Demo 当作需求真源；
- 不要实现跨 App 悬浮提词器；
- 不要把 AppSecret、第三方平台密钥、模型密钥放进小程序；
- 不要先写页面再自行猜 API 字段，字段有歧义先补契约。
