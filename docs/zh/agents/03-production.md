---
title: "生产部署：质量、成本、可观测与安全"
description: "AI 智能体：生产部署：质量、成本、可观测与安全"
---

# 生产部署：质量、成本、可观测与安全

![生产部署：质量、成本、可观测与安全](/assets/illustrations/11-production-observability.png)

> 医护理解锚点：从 demo 到真实工作流，关键不是让智能体看起来聪明，而是能被监控、能解释、能限权、能追责。医疗安全边界必须先于自动化。

## 本模块你要带走什么

- 先理解概念边界，再讨论产品和工具。
- 看到 AI 工具时，能判断它依赖的是模型本身、检索系统、工具调用，还是工作流控制。
- 面对医疗场景时，主动追问数据来源、验证方式、安全边界和人工复核。

## 8. 护栏机制

![Image](/assets/source/agents-09.jpg)

一个能工作的智能体，未必是安全的智能体。

LLM 是非确定性的。

它们可能格式出错、陈述错误事实、偏离任务。

护栏是介于“智能体声称任务完成”与“任务实际终结”之间的质量关卡。

三种类型：

**类型一 — 代码检查（快速且低成本）** 用于确定性场景。→ 输出格式是否正确？长度是否合适？必填字段是否存在？编写简单的验证函数，即时运行。只要可行，始终优先采用此方法。

**类型 2 — LLM 评判器**用于精细质量检查。→ "此回复是否与源文档在事实上保持一致？" → "语气是否专业且积极？" 如果评判器判定为否 → 解释原因 → 智能体修改 → 再次尝试。

**类型 3 — 人在回路中**用于高风险决策。智能体在最终确定前暂停，将输出提交人工审核。人工可批准、拒绝或要求修改。

大多数生产系统至少会使用这三种中的两种。

**9. 提升每个智能体的4种设计模式**

![Image](/assets/source/agents-10.jpg)

这四种模式能可靠地提升智能体的表现。

**模式一：反思**

不要止步于初稿。

模型生成输出 → 自我批判 → 根据批判重写。

邮件初稿："嘿，下个月见个面吧。谢谢。" 批判：日期模糊、缺少署名、语气过于随意。邮件终稿："嗨，Alex，我们 1 月 5 日至 7 日见个面吧。请告知合适时间。此致，Sai。"

通过代码变得更强大——编写、运行、捕获错误、反馈、模型修复。

适用场景：结构化输出、长文写作、代码、程序步骤。

**模式二：工具使用**

为 LLM 提供一组可调用的函数菜单。

模型决定何时以及使用何种工具。

网络搜索、数据库查询、代码执行、日历、电子邮件、API 调用。

LLM 无法单独完成这些任务。工具是智能体与世界交互的方式。

**模式三：规划**

与其使用固定的流程，不如让智能体自行决定步骤。

给它一套工具。提示它制定计划。然后逐步执行。

零售示例：“有100美元以下的圆形太阳镜吗？”智能体规划：搜索描述 → 检查库存 → 按价格筛选 → 给出答案。

你并没有编写这些具体步骤。是智能体自己选择了它们。

**模式4：多智能体协作**

将复杂工作拆分给专业智能体。

研究员 → 设计师 → 写作者。

每个智能体都擅长其特定任务。由于没有单个智能体试图包揽所有工作，最终输出质量更高。


---

## 10. 多智能体系统设计

![Image](/assets/source/agents-11.jpg)

如何实际构建一个多智能体系统？

四种协调模式，从最简单到最复杂。

**模式一：顺序执行**每个智能体完成任务后，将输出传递给下一个智能体。如同流水线一般：研究员→设计师→写作者→完成。易于调试，结果可预测。建议从此模式开始。

**模式二：并行处理**同时运行独立的智能体。研究员和设计师同步工作，写作者整合他们的输出。速度更快，但协调复杂度更高。

**模式三：管理层级**由一个管理型智能体协调各专业智能体。管理者负责规划、分配任务和审核。专业智能体向管理者汇报，彼此之间不直接沟通。这是实际生产系统中最常见的模式。

**模式 4：全互联**任何智能体都能向其他任意智能体发送消息。混乱无序，难以预测。仅适用于允许变动的创意性/低风险工作。切勿用于生产环境。

经验法则：从顺序执行开始。仅在必要时增加复杂度。


---

## 第三部分：生产部署 真正让你从原型走向交付的关键


---

## 11. Advanced Task Decomposition

![Image](/assets/source/agents-12.jpg)

In complex multi-agent systems, how you decompose matters a lot.

4 patterns:

**Functional** — split by technical domain. Frontend agent. Backend agent. Database agent. Classic for engineering teams.

**Spatial** — split by file or directory structure. Agent 1 handles /services/users/. Agent 2 handles /services/orders/. Great for large codebases. Minimizes conflicts.

**Temporal** — split by sequential phases. Phase 1: Research. Phase 2: Plan. Phase 3: Build. Phase 4: Launch. Each phase finishes before the next starts.

**Data-driven** — split by data partitions. Agent 1 processes Week 1 logs. Agent 2 processes Week 2. Etc. Powerful for large datasets. Parallelize analysis.

You can mix these.

Functional decomposition for the main structure + temporal decomposition inside each agent.

Use whatever matches your task's natural boundaries.


---

## 12. Improving Quality in Production

![Image](/assets/source/agents-13.jpg)

System is working but not good enough.

Two types of components. Two different fix strategies.

**Non-LLM components** (web search, RAG, OCR, code execution):

→ Tune the knobs: search date ranges, top-k results, chunk size, similarity thresholds → Swap providers: try different search APIs, vision models, parsers

**LLM components** (generation, reasoning, extraction):

→ Prompt better: add constraints, examples, output schemas → Try a different model: some models are better at code, others at following instructions → Decompose harder tasks into smaller pieces → Fine-tune (last resort only — costly, save for the final few %)

The order matters.

Fix prompts first. Try a different model. Decompose further. Fine-tune last.

Most teams reach good enough quality at step 2.


---

## 13. Latency and Cost

![Image](/assets/source/agents-14.jpg)

Quality first. Then speed and cost.

**Reducing latency:**

1. Measure every step. Find the real bottleneck.
2. Parallelize anything that doesn't depend on another step.
3. Right-size models — fast cheap LLM for simple steps, big model for reasoning.
4. Try faster providers — token streaming speeds vary a lot.
5. Trim context — shorter prompts decode faster.

**Reducing cost:**

Real cost breakdown for a typical research agent run:

→ LLM generation calls: ~$0.04 → Web search API calls: ~$0.02 → Embedding calls: ~$0.005 → Infrastructure: ~$0.015 → Total per run: ~$0.08

At 1,000 runs/day = $80/day = $2,400/month.

How to cut it:

→ Attack the biggest buckets first → Tier your models — cheap for easy, expensive for hard → Cache results aggressively (search results, embeddings, summaries) → Constrain outputs ("Return JSON. 5 fields max.") → Batch operations where possible
