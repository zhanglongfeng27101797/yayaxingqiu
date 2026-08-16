# 芽芽星球工作台 V1.2｜产品、设计、前后端完整交接总说明

版本日期：2026-08-16  
文档状态：研发评审基线  
适用对象：产品、UI/UX、Android/前端、后端、AI、测试、内容运营、项目负责人  
产品负责人：隆隆老师

> 本文档是 V1.2 唯一产品基线。若与 V1.0、旧 PRD、旧页面地图或旧实现指令冲突，以本文为准。V1.1 修改方案作为主要变更输入；V1.2 补丁进一步补齐数据真相、生成规则、API 契约、异常状态、安全边界和验收方式。

# 0. 交付结论与阅读方法

本项目交付分为三层，研发不得混淆：

1. Android Demo：离线 WebView 演示，用于确认产品结构、界面与核心操作；不访问抖音、飞书、AI 或真实课程服务。
2. 正式版 V1：移动端通过统一 API 调用业务服务；采集、转写、分析采用异步任务；用户、内容与创作数据持久化。
3. 后续能力：跨平台搜索、作者主页批采、评论洞察、发布复盘、团队协作等，本文只留扩展位，不纳入 V1 验收。

开发先读：第 1、3、4、12、13、15、18、21、24 章。设计先读：第 2、5–11、16 章。测试先读：第 14、18、19、24 章。

# 1. 产品定义

## 1.1 一句话定位

芽芽星球工作台是服务公司签约宝妈创作者的内容创作助手：帮助她们找到值得拍的内容、看懂对标内容、生成符合本人经历和表达方式的脚本，并完成拍摄前准备。

## 1.2 用户与场景

- 核心用户：公司签约宝妈创作者，非专业编导，时间碎片化，普遍不希望学习复杂 AI 提示词。
- 核心场景：今天不知道拍什么；刷到一条值得参考的视频；有选题但不会组织表达；准备拍摄需要提词；想补齐创作知识。
- 核心价值：减少选择负担，提高从灵感到可拍脚本的完成率，而非承诺爆款。

## 1.3 产品原则

- 系统推荐 + 少量选择，不用开放式聊天框替代产品设计。
- 每个核心按钮产生可感知结果，不以统一 Toast 冒充完成。
- 所有内容说明数据来源和时间；星级是内容机会判断，不是流量预测。
- 医疗母婴内容强调经验分享与安全边界，禁止替用户诊断、给药或承诺疗效。
- 70% 温和陪伴感 + 30% 专业工作台感；不做陪跑老师、作业考核、等级排行。

## 1.4 成功指标

- 激活：新用户 24 小时内完成一次“选题/对标 → 脚本 → 提词”。
- 核心转化：进入创作设置后生成脚本的比例；生成后进入提词器的比例。
- 资产沉淀：每周新增采集数、有效草稿数、再次编辑率。
- 内容帮助：推荐选题采纳率、对标转创作率、商学苑内容打开率。
- 质量护栏：任务失败率、内容串稿率、来源缺失率、医疗高风险拦截率。

## 1.5 明确不做

- V1 不做公域内容社区、私信、评论互动、直播、交易、打卡积分、排行榜、公开等级。
- V1 不做“专属运营老师/陪跑老师”入口。
- Demo 不接真实账号、真实采集、真实 ASR、真实 AI、真实播放或支付。
- 正式版 V1 暂不做抖音作者主页批采、小红书采集、评论洞察、发布后自动复盘。

# 2. 信息架构与导航

底部导航固定为：首页｜创作｜对标｜成长｜我的。对标在第三，成长在倒数第二。二级页面隐藏底栏并提供返回。

- 首页：今日任务、今日选题、采集主入口、创作工具、简报、继续创作。
- 创作：推荐选题、本地/服务端搜索、选题详情、三步设置、脚本编辑、我的创作、提词器。
- 对标：采集入口、全部/我的采集/芽芽精选、拆解详情、逐字稿、变成我的版本。
- 成长：问题选择、课程/回放/创作者分享/运营精选、内容详情。
- 我的：账号绑定、创作资料、权益、通知、帮助、设置、关于。

# 3. 版本范围与优先级

## 3.1 P0：正式版首发必须完成

- 登录与用户隔离；创作资料读取/保存。
- 首页聚合与今日选题。
- 选题列表、详情、三步创作、数据驱动脚本生成、草稿保存、编辑、轻量撤销、提词器。
- 单链接采集、任务状态、逐字稿、拆解、我的采集筛选、来源与时间标识、对标转创作。
- 核心异常状态：加载、空、离线、鉴权失效、可重试失败、永久失败。
- 医疗风险与平台风险审核；密钥仅在服务端；埋点和基础监控。

## 3.2 P1：首发后近期

- 商学苑完整内容后台、学习进度、关键词搜索。
- 消息通知、任务完成推送、收藏、更多筛选。
- 批量粘贴、失败项单独重试。
- 账号发布数据手工/授权导入与轻量复盘。

## 3.3 P2：后续探索

- 作者主页批采、跨平台搜索、小红书适配、评论问题库。
- 低粉高赞筛选、关键帧/封面分析、团队协作与内容审批。

# 4. 三条核心闭环

## 4.1 今天不知道拍什么

首页今日选题 → 选题详情 → 我想拍 → 选择内容方向 → 选择开头/换组 → 选择口吻 → 生成 → 编辑/优化/撤销 → 提词器 → 速度/字号/镜像/开始暂停。

## 4.2 刷到一个爆款

首页或对标页粘贴链接 → 创建采集任务 → 查看进度 → 成功进入我的采集 → 查看拆解/逐字稿 → 变成我的版本 → 三步设置 → 生成草稿。

## 4.3 我想学习

成长 → 选择当前问题或搜索 → 推荐课程/回放/分享/精选 → 内容详情 → 返回后保持筛选状态。

# 5. 首页 HOME

## 5.1 模块顺序

问候与品牌信息、今天值得拍、采集爆款主卡、创作工具、创作简报、继续创作。首屏重点只有一个选题主 CTA 和一个采集主入口。

## 5.2 今日选题卡

显示标题、星级、标签、推荐理由、拍摄难度、数据声明与“我想拍”。推荐理由必须结合创作资料；宝宝年龄不匹配时使用“你刚经历过这个阶段”等诚实表述，不假装实时命中。

## 5.3 常用工具

- 采集爆款：主卡，进入采集表单。
- 提取逐字稿：输入 → 进度 → 标题/作者/逐字稿 → 复制/保存/去拆解。
- 视频拆解：支持粘贴链接或从我的采集选择。
- 提词器：打开最近草稿；无草稿时提示先生成。
- 去水印下载、灵感库：P2，展示明确“Demo/当前版本未开放”，不伪装完成。

## 5.4 创作简报

正式版取用户自己的发布结果快照；无授权时展示空状态和绑定说明。Demo 必须标示示例数据。指标包括发布数、新增粉丝、新增获赞、最高播放，口径以自然月和数据快照时间为准。

# 6. 创作 CREATION

## 6.1 选题库

选题字段：标题、类目、结构、星级、理由、难度、拥挤度、创作者适配、创作空间、医疗风险、平台风险、内容核心、方向、开头分组。搜索按标题、类目和标签匹配。

## 6.2 星级规则

- 5 星强烈推荐：需求明确、适配高、可形成差异表达、风险可控。
- 4 星值得拍：需求明确，但需要素材、经历或表现形式支撑。
- 3 星可以改：有需求但太专业、太拥挤或风险较高；系统需给出安全改写方向。
- 1–2 星不进入默认推荐，不等于内容违法，仅代表当前账号不优先。

## 6.3 选题详情

必须数据驱动展示六项指标，不能所有选题都写“很高/很大”。三星选题的主按钮为“帮我改成宝妈能拍”，将话题收窄为经验、记录、沟通或生活场景，不生成诊断与用药。

## 6.4 三步创作设置

1. 内容方向：判断解惑、避坑纠错、流程清单、对比选择、经验复盘、好物种草。每个选题只展示适合的 3–4 项。
2. 开头：每个方向至少两组，每组三句；换组必须产生不同文本，用户选择后才生效。
3. 口吻：自然聊天、真实经验、清楚专业、有点冲突；口吻改变连接词、第一人称程度、情绪强度和结尾。

## 6.5 生成规则

生成输入 = 源内容事实骨架 × 内容方向结构渲染器 × 表达口吻渲染器 × 创作者画像 × 风险约束。任何草稿不得从另一选题回退正文。缺字段时显示空编辑区或同主题安全默认值。

生成输出：title、opening、body、ending、advice、structure、tone、sourceType、sourceId、promptVersion、model、safetyFlags。Demo 使用本地模板；正式版使用后端生成服务。

# 7. 脚本编辑与我的创作

- 开头、正文、结尾可编辑，输入后自动保存，500–800ms 防抖。
- 快速优化只修改目标字段：更口语改正文措辞；再短一点压缩正文；更抓人只改开头。
- 每次优化保留一次 lastSnapshot，显示“已优化｜撤销”。
- 换个开头先弹出三个新选项；选中后替换，取消不改稿。
- 我的创作按 updatedAt 倒序，显示来源、结构、口吻、状态与继续编辑/提词。
- 删除、归档属于 P1；正式版删除需二次确认并可在短时间撤销。

# 8. 提词器

显示完整脚本；支持慢/中/快三档、开始/暂停、字号 24/28/32/36、镜像、重置。切换速度时立即生效，退出页面停止计时器。正式版需保持屏幕常亮，可由用户关闭；不采集摄像头和麦克风权限。

# 9. 对标与采集

## 9.1 来源分类

- user_capture：当前用户主动采集，仅出现在“我的采集”。
- yaya_pick：运营精选，仅出现在“芽芽精选”。
- legacy_snapshot：原育咖采集表迁移的历史快照，只在“全部”显示并明确标记。

筛选只能依赖 sourceType，不依赖来源文案。每次采集生成 UUID/ULID，连续采集不得覆盖。

## 9.2 对标卡片

显示封面、标题、作者、星级、结构、学习标签、赞藏评快照、来源。所有指标携带 capturedAt；不可展示为实时值。

## 9.3 拆解详情

显示一句话看懂、为什么值得学、开头钩子及原因、内容流程、逐字稿节选/全文、可借鉴点、可改角度与变成我的版本。原视频链接仅在权限和平台规则允许时打开。

## 9.4 采集与拆解区别

提取逐字稿只产出文本；视频拆解产出结构化 Analysis；采集负责保存内容资产并触发流水线。三个入口可以共享任务流水线，但结果页面不同。

# 10. 成长｜芽芽星球商学苑

内容类型包括课程、直播回放、创作者分享、运营精选、平台规则。问题标签全部换行可见：不知道拍什么、不知道怎么拍、不敢出镜、更新太慢、数据不好。切换问题即时刷新推荐；搜索按标题、类型、摘要匹配。

V1 不展示公开等级、今日作业、签到、积分、排行榜、专属老师。内容详情需支持视频/图文的统一壳，字段包括标题、类型、时长、摘要、封面、正文/媒体、适用问题、发布时间、状态。

# 11. 我的 PROFILE

创作资料至少保存昵称、创作方向、宝宝年龄、表达风格、是否愿意露脸。保存后立即刷新并持久化。账号绑定、权益、通知、帮助、设置、关于使用清晰状态；未实现功能直接标注，不统一 Toast 冒充服务。

# 12. 统一数据模型

## 12.1 User / CreatorProfile

userId、tenantId、nickname、avatarUrl、creatorDirections[]、babyAgeStage、tonePreference、willingToAppear、platformAccounts[]、createdAt、updatedAt。宝宝信息属于敏感画像，最小化采集，支持修改和删除。

## 12.2 Topic

topicId、title、category、structure、stars、starLabel、why、difficulty、crowding、medicalRisk、platformRisk、creatorFit、creationSpace、directions[]、hooksByDirection、contentCore、keyPoints[]、safetyNote、status、validFrom、validTo、sourceRefs[]。

## 12.3 Content / Benchmark

contentId、platform、platformContentId、canonicalUrl、title、author、caption、topics[]、metrics、media、capturedAt、sourceChannel、rawSnapshotRef、extractorVersion。Benchmark 另含 benchmarkId、userId、sourceType、sourceLabel、structure、stars、learnTags、status。

## 12.4 Transcript / Analysis

Transcript：transcriptId、contentId、text、language、segments[]、provider、model、qualityScore、createdAt。Analysis：analysisId、contentId、analysisType、oneLine、whyLearn、hook、hookReason、flow[]、points[]、angles[]、riskFlags[]、promptVersion、model、createdAt。每次分析新增版本，不覆盖历史结论。

## 12.5 ScriptDraft

draftId、userId、title、sourceType、sourceId、structure、tone、opening、body、ending、advice、status、lastSnapshot、generationMeta、createdAt、updatedAt、version。

## 12.6 AcademyContent

academyContentId、title、contentType、problemTags[]、summary、durationSeconds、coverUrl、mediaUrl/body、status、publishedAt、sortWeight。

# 13. 后端架构与任务流水线

正式版建议采用移动端/前端 → API 网关/BFF → 业务服务 → 异步 Worker → 数据库/对象存储/第三方适配器。移动端不得直连飞书、模型或平台抓取接口。

采集任务状态：queued → parsing → downloading → transcribing → reviewing → analyzing → persisting → succeeded；异常进入 retryable_failed 或 failed；用户取消进入 cancelled。每阶段幂等，保留结果和 attempt；租约避免重复执行。

Demo 使用 localStorage；正式版 V1 使用关系数据库保存业务实体、对象存储保存媒体/原始快照。飞书可作为运营后台和导入导出渠道，但不能继续作为移动端内部协议。现有 Node 流水线的统一 ContentDocument、租约、模型降级和媒体单次读取逻辑应复用。

# 14. API 契约

统一前缀 /v1；JSON；Authorization: Bearer token；写操作支持 Idempotency-Key；时间为 ISO 8601 UTC；分页 cursor/limit；错误统一返回 code、message、requestId、details。

- GET /me/profile；PATCH /me/profile。
- GET /home：问候、今日选题、简报、最近草稿、推荐学习内容。
- GET /topics；GET /topics/{id}；POST /topics/{id}/adapt。
- POST /capture-jobs；GET /capture-jobs/{id}；POST /capture-jobs/{id}/retry；POST /capture-jobs/{id}/cancel。
- GET /benchmarks；GET /benchmarks/{id}；POST/DELETE /benchmarks/{id}/favorite。
- POST /transcript-jobs；GET /transcript-jobs/{id}。
- POST /analysis-jobs；GET /analysis-jobs/{id}。
- POST /script-drafts/generate；GET /script-drafts；GET/PATCH /script-drafts/{id}；POST /script-drafts/{id}/optimize。
- GET /academy/feed；GET /academy/content/{id}。

关键错误码：AUTH_REQUIRED、FORBIDDEN、INVALID_INPUT、UNSUPPORTED_URL、PLATFORM_RATE_LIMITED、MEDIA_UNAVAILABLE、TRANSCRIPT_FAILED、ANALYSIS_FAILED、CONTENT_RISK_BLOCKED、NOT_FOUND、CONFLICT、RATE_LIMITED、INTERNAL_ERROR。

# 15. 前端状态与异常

每个远程页面必须有 loading、success、empty、offline、error 五态。异步任务页面另有 processing、retryable_failed、failed、cancelled。列表刷新保持滚动和筛选；详情轮询只更新变化字段，不反复重建输入控件。

本地缓存只保存非敏感 UI 偏好和草稿队列；Token 使用 Android Keystore/安全存储。schemaVersion 升级提供 migration；失败时备份旧值并安全回退，不能静默把另一条数据当默认。

# 16. 视觉与组件规范

- 画布：Android 360–480dp 优先，适配安全区；内容最大宽度 480dp。
- 品牌：温和绿色为主，紫色/橙色辅助；页面背景浅灰绿，卡片白色。
- 字号：页面标题 24–28sp，模块标题 18sp，卡片标题 14–16sp，正文 14sp，辅助 11–12sp。
- 间距：4/8/12/16/24 体系；卡片圆角 16–20dp；触控区不小于 44×44dp。
- 图标：统一 24dp 线性 SVG/VectorDrawable，1.8–2dp 线宽；品牌小芽可保留，业务入口不使用杂乱 Emoji。
- 组件：TopBar、BottomNav、Primary/Secondary/Ghost Button、Card、Tag、DemoPill、Search、Tabs、BottomSheet、Progress、Empty/Error、Toast。
- 无障碍：正文对比度 ≥4.5:1；按钮有文本或 contentDescription；支持系统字体放大；信息不只靠颜色表达。

# 17. 内容生成与安全

生成服务必须把事实输入与表达模板分离。事实只能来自 Topic.contentCore/keyPoints、Transcript 或已验证 Analysis；不得根据语气模板补造医疗事实。高医疗风险主题只能生成记录、经验、沟通、就医准备，不给诊断、剂量、停药或替代就医建议。

输出前执行：敏感主题识别 → 事实一致性 → 绝对化/夸大承诺 → 平台违规词 → 医疗安全 → 版权复刻相似度。被拦截时返回 riskFlags 和可解释的安全改写，不用空泛失败。

# 18. 埋点与监控

核心事件：app_open、home_topic_view、topic_open、topic_start_create、direction_select、hook_select、hook_group_refresh、tone_select、draft_generate_start/success/fail、draft_edit、draft_optimize、draft_undo、teleprompter_start/speed_change、capture_submit/success/fail、benchmark_open/to_draft、transcript_submit/success、analysis_submit/success、academy_problem_select/content_open、profile_save。

公共属性：userIdHash、sessionId、appVersion、platform、networkType、sourceType、sourceId、requestId、experimentId。禁止上报 Token、原始链接中的敏感参数、完整逐字稿、完整脚本文本和宝宝可识别信息。

监控：API P95、任务各阶段耗时与失败率、第三方限流、队列堆积、生成安全拦截率、客户端崩溃/白屏。requestId 贯通客户端、API、Worker。

# 19. 非功能要求

- 首页缓存命中首屏 ≤1.5s；普通 API P95 ≤800ms；异步任务 30s 内给出持续进度或明确状态。
- 列表分页 20 条；图片懒加载；弱网可重试，重复提交由幂等键去重。
- 99.5% 月可用性（不含第三方平台故障）；核心数据每日备份；RPO 24h、RTO 4h（内测阶段）。
- Android minSdk 24；目标 SDK 按发布时要求；WebView 仅加载受信资源，禁用不必要文件访问和混合内容。

# 20. 隐私、权限与合规

仅申请业务必要权限；当前提词器不需要相机/麦克风。第三方凭证仅服务端保存并加密；日志脱敏；用户可导出和删除个人资料、草稿与采集记录。采集与打开原视频遵守平台条款、版权和访问权限。母婴医疗内容展示“经验分享不替代专业建议”，高风险内容由人工审核策略兜底。

# 21. Demo 与正式版映射

- localStorage → 正式版用户数据库与离线缓存。
- 本地采集进度 → POST capture-jobs + 状态轮询/推送。
- 本地逐字稿样例 → ASR Worker + Transcript。
- 本地拆解样例 → Analysis Worker + 版本化结果。
- 本地模板生成 → script-drafts/generate + 风险审核。
- 演示简报 → 平台授权/手工导入的 PerformanceSnapshot。
- 演示课程 → Academy CMS/内容服务。

Demo 中所有模拟能力必须显式写“演示版”“示例数据”或“历史快照”；研发评审不得把动画进度和静态结果计入后端完成度。

# 22. 原育咖采集表迁移

已用于 Demo 的历史样例包括：产后伤口护理科普之歌第一节、孕期食物红黑榜、不要问孕妇想吃什么你做好了她就会吃了。迁移时保留标题、作者、逐字稿、封面及赞藏评转快照；写入 sourceType=legacy_snapshot、capturedAt、sourceLabel。历史快照不进入“我的采集”和“芽芽精选”。

正式迁移流程：字段映射 → 数据清洗 → 平台内容去重 → 生成 canonicalUrl/contentId → 媒体与逐字稿校验 → 来源和时间补齐 → 风险复核 → 抽样验收 → 只读归档旧表。

# 23. 研发分工与联调顺序

前端负责页面、组件、路由、本地编辑体验、任务状态展示、错误恢复、埋点和安全存储。后端负责鉴权、用户隔离、业务数据、异步任务、第三方适配、幂等、审计和安全审核。AI/算法负责转写与生成契约、版本、质量门控和降级。运营负责选题、精选、商学苑内容和风险规则配置。测试负责契约、状态机、弱网、迁移、回归和真机。

联调顺序：认证/资料 → 选题 → 草稿 CRUD → 生成 → 采集任务 → 逐字稿/拆解 → 对标转创作 → 首页聚合 → 商学苑 → 埋点/监控 → 安全与性能。

# 24. 验收清单

## 24.1 Demo 真机

- 底栏为首页、创作、对标、成长、我的。
- 首页采集主入口权重大于普通工具。
- 选题、方向、口吻变化会明显改变生成结果。
- 换一组开头出现全新三句；换开头先选择再替换；可撤销。
- 夜醒草稿不出现辅食正文；缺字段不串稿。
- 提词器三档速度有明显差异，切换即时生效。
- 连续采集 3 次生成 3 个不同 ID；我的采集只显示 user_capture。
- 对标详情有来源、快照时间、结构和逐字稿展开。
- 提取逐字稿和视频拆解分别可走完完整流程。
- 三星发烧选题被改为记录/沟通，不给诊断或用药。
- 成长问题标签全部可见，内容类型多样，搜索有效。
- 资料保存后首页/我的同步变化，重启仍保留。

## 24.2 正式版接口

- 未登录、越权、无数据、弱网、超时、第三方限流均有明确状态。
- 创建任务和生成草稿支持幂等；重复请求不生成重复资产。
- 所有列表按 tenantId/userId 隔离；日志不含密钥和正文。
- 任务状态只按合法转换推进；可重试错误保留 attempt 和最后错误。
- Analysis/Transcript/Prompt 均保留版本、模型和创建时间。

# 25. 版本来源与决策记录

- V1.0 超全交接包：保留产品定位、五大模块、三条闭环、温和工作台视觉和初始数据结构。
- V1.1 Codex 完整修改方案：覆盖导航顺序、生成真实性、开头换组、串稿、逐字稿/拆解、采集筛选、商学苑、资料保存、真假交互和图标规范。
- 现有流光 2.0 架构：吸收 ContentDocument、适配器边界、Analysis 独立版本、租约、媒体单次读取和模型降级。
- iOS/Worker 文档：吸收 Bearer Token、安全存储、远程节点、异步任务、用户隔离和状态机。
- V1.2 补丁：明确 Demo/正式版分层、Postgres/对象存储目标形态、完整 API、错误码、埋点、NFR、迁移、医疗安全和研发联调顺序。

# 26. 发布与交接

V1.2 Demo 用于产品确认，不直接上架。正式研发开始前召开一次 90 分钟评审：前 20 分钟走三条链路；30 分钟确认范围/页面；25 分钟确认数据/API/状态机；15 分钟确认排期、负责人和阻塞项。评审结论回写需求矩阵，任何范围变更必须记录变更原因、影响端和验收变化。
