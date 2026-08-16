# 旧 WebView Demo 已知代码问题｜只看反例，不迁移

本文把旧 APK `app.js` 中已经确认会误导正式开发的逻辑单独列出。以下均是**反例**。

## 1. 旧导航顺序错误

旧 Demo 的 `navItems` 顺序是：

```text
home → creation → growth → benchmark → profile
```

对应：

```text
首页｜创作｜成长｜对标｜我的
```

正式小程序必须是：

```text
首页｜创作｜对标｜成长｜我的
```

不要根据旧 Demo 的数组顺序生成正式 TabBar。

## 2. “换一组开头”只是重排

旧 Demo 的逻辑本质为：

```text
[h0, h1, h2] → [h1, h2, h0]
```

这不是“换一组”。正式要求：下一组必须返回新的 3 个 hook，旧 hook ID 通过 `excludeHookIds` 排除。

## 3. 生成脚本使用固定正文模板

旧 Demo 的生成逻辑主要是 UI Mock，选题、方向和口吻对正文影响很弱，存在不同选题套同一段正文的问题。

正式要求：

```text
当前 sourceType + sourceId
× direction
× hookId
× tone
→ 当前草稿
```

服务端禁止从其他 Topic / Benchmark / Draft 兜底。

## 4. 草稿缺字段时跨稿 fallback

旧 Demo 曾在当前草稿没有完整 body/ending 时，读取另一条初始化草稿字段作为 fallback，导致“夜醒题打开却出现辅食正文”的风险。

正式要求：当前来源不完整时返回 `SOURCE_INCOMPLETE` 或保留当前稿空字段，绝不读取其他稿件正文。

## 5. 固定采集 ID

旧 Demo 使用固定演示 ID（例如 `captured-demo`）表达新采集，连续采集可能覆盖上一条。

正式要求：每次正常采集创建新的 job/resource ID；只有相同 `Idempotency-Key` 的请求重放才返回原任务。

## 6. “我的采集”来源判断错误

旧 Demo 曾以“不是芽芽精选”作为“我的采集”的判断，因此历史迁移内容也可能被混入。

正式要求：

```text
我的采集 = sourceType === user_capture && ownerUserId === 当前用户
芽芽精选 = sourceType === yaya_pick
legacy_snapshot = 只在全部中按来源展示
```

## 7. 提词器速度是假状态

旧 Demo 页面显示“中速”，底层滚动间隔固定，用户无法真正切换慢/中/快。

正式要求：三档速度必须真实影响滚动，切换时即时生效。

## 8. 首页视频拆解直接跳对标库

旧 Demo 把“视频拆解”当成“进入对标页”。

正式要求：视频拆解是一次独立分析任务，可从链接或我的采集创建 Analysis Job；完成后复用拆解详情页。

## 9. 搜索/编辑等视觉控件曾无真实行为

旧 Demo 部分搜索框、资料保存等只具备 UI 外观或 Toast。

正式原则：

- P0/P1 未实现的能力不要伪装成可用；
- 如果展示搜索框，它就必须实际过滤；
- 保存后必须真实回写状态；
- 核心 CTA 禁止统一 Toast 冒充完成。

## 10. 浏览器/WebView实现方式不能直接迁移

旧代码中的 DOM、浏览器 localStorage、fixed nav、Android WebView 返回逻辑都不是小程序正式实现参考。

小程序应按 `docs/technical/wechat-platform-boundaries.md` 与正式前端技术栈重写。
