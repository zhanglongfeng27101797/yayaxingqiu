# 用户流程与页面地图

```mermaid
flowchart TB
    APP[Flutter 移动端] --> HOME[首页]
    APP --> CREATE[创作]
    APP --> BENCH[对标]
    APP --> GROW[成长]
    APP --> ME[我的]
    HOME --> CAPTURE[创建采集任务]
    HOME --> TOPIC[选题详情]
    CREATE --> CONFIG[方向 / 开头 / 口吻]
    CONFIG --> SCRIPT[脚本编辑]
    SCRIPT --> TELE[提词器]
    BENCH --> DETAIL[对标拆解详情]
    DETAIL --> CONFIG
    GROW --> LESSON[课程 / 案例 / 清单 / 工具]
    ME --> PROFILE[创作者资料]
```

## 从选题到拍摄

1. 用户浏览选题并查看机会、难度和安全边界。
2. 用户选择创作方向、开头和表达口吻。
3. API 根据唯一来源生成脚本草稿。
4. 用户编辑内容、获取新开头、应用并撤销修改。
5. 用户进入提词器，调整速度、字号和镜像后拍摄。

## 从采集到二创

```mermaid
sequenceDiagram
    actor U as 创作者
    participant F as Flutter
    participant API as TypeScript API
    participant W as TypeScript Worker
    participant DB as PostgreSQL/对象存储
    U->>F: 粘贴平台链接
    F->>API: POST /v1/capture-jobs
    API->>W: 投递任务
    W->>W: 解析、下载、转写、审核、分析
    W->>DB: 保存版本化结果
    F->>API: 查询任务状态
    API-->>F: succeeded + resultId
    F-->>U: 展示拆解详情
    U->>F: 变成我的版本
    F->>API: 来源 + 方向 + 口吻
    API-->>F: ScriptDraft
```

## 页面通用状态

每个远程页面必须覆盖 `loading`、`success`、`empty`、`offline` 和 `error`。任务页面额外覆盖 `processing`、`retriable_failed`、`failed` 和 `cancelled`。

