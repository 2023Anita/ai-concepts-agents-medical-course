import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs");
const sourceDir = path.join(docs, "public", "assets", "source");
const illustrationDir = path.join(docs, "public", "assets", "illustrations");

const sources = {
  concepts: "/Users/anita/obsidian2026/raw/articles/2026 年你必须理解的 20 个 AI 概念.md",
  agents: "/Users/anita/obsidian2026/raw/articles/AI 智能体：完整课程.md"
};

const conceptGroups = [
  {
    slug: "01-foundations",
    title: "基础原理：AI 如何把输入变成预测",
    range: [0, 5],
    image: "02-neural-network.png",
    medical: "把它当成医学检验流程：输入是病史、文本、图像或结构化数据，中间层不断提取线索，输出是概率化预测。重点不是神秘智能，而是大量参数在学习统计关系。"
  },
  {
    slug: "02-llm-workflow",
    title: "LLM 如何工作：聊天背后的上下文与随机性",
    range: [5, 10],
    image: "05-hallucination-temperature.png",
    medical: "临床沟通里，同一句话放在不同病史背景下会有不同解释。LLM 也是这样依赖上下文窗口。温度、幻觉和提示词工程决定了它更像严谨病历摘要，还是更像开放头脑风暴。"
  },
  {
    slug: "03-model-improvement",
    title: "模型如何变好：从基础模型到可用产品",
    range: [10, 15],
    image: "06-rag-vector-database.png",
    medical: "基础模型像通识医学学生，微调、RLHF、LoRA 和量化像不同阶段的专科训练、反馈与部署压缩。医疗场景要关注数据来源、适用人群和验证边界。"
  },
  {
    slug: "04-real-systems",
    title: "真实 AI 系统：RAG、向量库、智能体与扩散模型",
    range: [15, 21],
    image: "01-ai-learning-map.png",
    medical: "真实产品很少只靠一个模型。它们通常把检索、数据库、工具调用、工作流和安全控制接在一起。医护人员要学会看系统边界，而不是只看模型名字。"
  }
];

const agentGroups = [
  {
    slug: "01-foundations",
    title: "入门篇：AI 智能体究竟是什么",
    range: [0, 5],
    image: "07-agent-react-loop.png",
    medical: "智能体不是更会聊天的模型，而是能在目标、工具、反馈之间循环工作的系统。适合多步骤、需要查资料和反复修正的任务，不适合所有医疗场景。"
  },
  {
    slug: "02-system-design",
    title: "系统设计：评估、记忆、护栏与多智能体",
    range: [5, 10],
    image: "10-multi-agent-collaboration.png",
    medical: "医疗场景中，智能体系统必须有评估、记忆边界、人工复核和护栏。没有这些，自动化越强，风险越集中。"
  },
  {
    slug: "03-production",
    title: "生产部署：质量、成本、可观测与安全",
    range: [10, 16],
    image: "11-production-observability.png",
    medical: "从 demo 到真实工作流，关键不是让智能体看起来聪明，而是能被监控、能解释、能限权、能追责。医疗安全边界必须先于自动化。"
  }
];

const localeInfo = {
  en: {
    title: "AI Concepts and Agents for Healthcare",
    desc: "A guided entry for healthcare professionals. The full Chinese course preserves the complete source content and images.",
    cta: "Open the complete Chinese course"
  },
  ja: {
    title: "医療者のための AI 概念とエージェント入門",
    desc: "医療者向けの導入ページです。完全な教材と原文画像は中国語メインコースに保存されています。",
    cta: "完全な中国語コースを開く"
  },
  ko: {
    title: "의료인을 위한 AI 개념과 에이전트 입문",
    desc: "의료인을 위한 안내 페이지입니다. 전체 원문과 이미지는 중국어 메인 코스에 보존되어 있습니다.",
    cta: "전체 중국어 과정 열기"
  },
  fr: {
    title: "Concepts IA et agents pour soignants",
    desc: "Une entrée guidée pour les professionnels de santé. Le cours chinois complet conserve tout le contenu source et les images.",
    cta: "Ouvrir le cours chinois complet"
  },
  de: {
    title: "KI-Konzepte und Agenten für medizinische Einsteiger",
    desc: "Ein geführter Einstieg für medizinische Fachpersonen. Der vollständige chinesische Kurs bewahrt alle Originalinhalte und Bilder.",
    cta: "Vollständigen chinesischen Kurs öffnen"
  }
};

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(illustrationDir, { recursive: true });

const conceptSource = readSource("concepts");
const agentSource = readSource("agents");

writeMarkdown("zh/index.md", buildHome());
writeMarkdown("zh/visual-map.md", buildVisualMap());
writeMarkdown("zh/practice/index.md", buildPractice());
writeMarkdown("zh/resources/index.md", buildResources());
writeMarkdown("zh/original/20-ai-concepts.md", buildOriginalPage(conceptSource, "2026 年你必须理解的 20 个 AI 概念", "concepts"));
writeMarkdown("zh/original/ai-agents-course.md", buildOriginalPage(agentSource, "AI 智能体：完整课程", "agents"));

for (const group of conceptGroups) {
  writeMarkdown(`zh/concepts/${group.slug}.md`, buildGroupPage(conceptSource.sections, group, "20 个 AI 概念"));
}

for (const group of agentGroups) {
  writeMarkdown(`zh/agents/${group.slug}.md`, buildGroupPage(agentSource.sections, group, "AI 智能体"));
}

for (const [locale, info] of Object.entries(localeInfo)) {
  writeMarkdown(`${locale}/index.md`, buildLocaleHome(locale, info));
  writeMarkdown(`${locale}/visual-map.md`, buildLocaleSimplePage(info, "Visual Maps", "/zh/visual-map"));
  writeMarkdown(`${locale}/practice/index.md`, buildLocaleSimplePage(info, "Practice", "/zh/practice/"));
  writeMarkdown(`${locale}/resources/index.md`, buildLocaleSimplePage(info, "Resources", "/zh/resources/"));
}

console.log(JSON.stringify({
  concepts: { sections: conceptSource.sections.length, images: conceptSource.imageCount },
  agents: { sections: agentSource.sections.length, images: agentSource.imageCount }
}, null, 2));

function readSource(kind) {
  const raw = fs.readFileSync(sources[kind], "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const localized = localizeImages(body, kind);
  return {
    kind,
    frontmatter,
    body: localized.body,
    imageCount: localized.imageCount,
    sections: splitSections(localized.body)
  };
}

function splitFrontmatter(text) {
  if (!text.startsWith("---\n")) return { frontmatter: "", body: text };
  const end = text.indexOf("\n---", 4);
  if (end === -1) return { frontmatter: "", body: text };
  return { frontmatter: text.slice(0, end + 4), body: text.slice(text.indexOf("\n", end + 4) + 1) };
}

function localizeImages(markdown, kind) {
  let index = 0;
  const body = markdown.replace(/!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g, (_match, alt, url) => {
    index += 1;
    const ext = extensionFromUrl(url);
    const filename = `${kind}-${String(index).padStart(2, "0")}${ext}`;
    const target = path.join(sourceDir, filename);
    if (!fs.existsSync(target)) {
      download(url, target);
    }
    return `![${alt || `${kind} 原图 ${index}`}](/assets/source/${filename})`;
  });
  return { body, imageCount: index };
}

function extensionFromUrl(url) {
  const parsed = new URL(url);
  const format = parsed.searchParams.get("format");
  if (format) return `.${format.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
  const ext = path.extname(parsed.pathname);
  return ext || ".jpg";
}

function download(url, target) {
  const tmp = `${target}.tmp`;
  const direct = spawnSync("curl", ["-L", "--fail", "--silent", "--show-error", "--connect-timeout", "15", "--max-time", "60", "-o", tmp, url], { encoding: "utf8" });
  const result = direct.status === 0
    ? direct
    : spawnSync("curl", ["-L", "--fail", "--silent", "--show-error", "--proxy", "http://127.0.0.1:7897", "--connect-timeout", "15", "--max-time", "90", "-o", tmp, url], { encoding: "utf8" });
  if (result.status !== 0) {
    console.error(result.stderr);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    throw new Error(`Failed to download ${url}`);
  }
  fs.renameSync(tmp, target);
}

function splitSections(markdown) {
  const lines = markdown.split("\n");
  const sections = [];
  let current = { title: "导言", content: [] };
  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      if (current.content.length) sections.push(current);
      current = { title: line.replace(/^##\s+/, "").replace(/\\\./g, ".").trim(), content: [line] };
    } else {
      current.content.push(line);
    }
  }
  if (current.content.length) sections.push(current);
  return sections;
}

function buildHome() {
  return `---
title: "医护 AI 概念与智能体课程"
description: "从 20 个 AI 概念到智能体系统，给医护人员的可视化入门课"
---

<div class="course-hero">
  <div>
    <p class="kicker">AI Literacy for Healthcare</p>
    <h1>医护 AI 概念<br />与智能体课程</h1>
    <p>从神经网络、Token、Embedding、Transformer、RAG，到智能体、上下文工程、护栏、可观测与安全。先看懂 AI 如何工作，再判断它能不能安全进入医疗学习与科研流程。</p>
  </div>
  <img src="/assets/illustrations/01-ai-learning-map.png" alt="医护 AI 学习地图" />
</div>

> 本课程改写自两篇原始资料，并完整保留原文与全部图片。新增讲义会把技术概念翻译成医护人员熟悉的语言：病历、检验流程、会诊、质控、院感边界、科研复现与患者数据安全。

<div class="warm-grid">
  <div class="warm-card"><h3>3 分钟看懂</h3><p>先用框架图知道 AI 概念和智能体系统的全貌。</p></div>
  <div class="warm-card"><h3>30 分钟练习</h3><p>用医护场景判断：什么时候用普通 LLM，什么时候才需要智能体。</p></div>
  <div class="warm-card"><h3>2 小时系统学习</h3><p>按概念课与智能体课两条路线逐章推进。</p></div>
  <div class="warm-card"><h3>带教可复用</h3><p>资料库提供术语卡、检查表、提示词和课堂模板。</p></div>
</div>

## 学习入口

| 路线 | 适合谁 | 入口 |
|---|---|---|
| 20 个 AI 概念 | 刚开始系统理解 AI 的医护人员 | [基础原理](/zh/concepts/01-foundations) |
| AI 智能体完整课 | 想理解 Agent、工作流和生产安全的人 | [智能体入门](/zh/agents/01-foundations) |
| 框架图 | 想先看到全局地图的人 | [框架图与流程](/zh/visual-map) |
| 练习 | 想课堂带教或自测的人 | [医护练习](/zh/practice/) |
| 原文保留 | 想看完整原始资料的人 | [20 个 AI 概念原文](/zh/original/20-ai-concepts) / [智能体原文](/zh/original/ai-agents-course) |

![智能体 ReAct 循环](/assets/illustrations/07-agent-react-loop.png)
`;
}

function buildGroupPage(sections, group, courseName) {
  const picked = sections.slice(group.range[0], group.range[1]);
  return `---
title: "${group.title}"
description: "${courseName}：${group.title}"
---

# ${group.title}

![${group.title}](/assets/illustrations/${group.image})

> 医护理解锚点：${group.medical}

## 本模块你要带走什么

- 先理解概念边界，再讨论产品和工具。
- 看到 AI 工具时，能判断它依赖的是模型本身、检索系统、工具调用，还是工作流控制。
- 面对医疗场景时，主动追问数据来源、验证方式、安全边界和人工复核。

${picked.map((section) => normalizeForVitePress(section.content.join("\n"))).join("\n\n---\n\n")}
`;
}

function buildOriginalPage(source, title, kind) {
  const sourcePath = sources[kind];
  return `---
title: "${title} 原文全文"
description: "完整保留原始资料内容与图片"
---

# ${title} 原文全文

> 来源文件：\`${sourcePath}\`  
> 本页保留原文结构、段落与全部图片，并将外链图片本地化到 \`docs/public/assets/source/\`。

${source.frontmatter ? `\`\`\`yaml\n${source.frontmatter.replace(/^---\n?|\n?---$/g, "").trim()}\n\`\`\`\n\n` : ""}

${normalizeForVitePress(source.body)}
`;
}

function buildVisualMap() {
  return `---
title: "框架图与流程"
description: "用 Mermaid 理解 AI 概念、智能体和医疗安全边界"
---

# 框架图与流程

![AI 概念与智能体总览](/assets/illustrations/01-ai-learning-map.png)

## 学习路线

\`\`\`mermaid
flowchart LR
  A["看懂基础概念"] --> B["理解 LLM 工作机制"]
  B --> C["识别模型改进方法"]
  C --> D["看懂 RAG 与向量库"]
  D --> E["理解智能体循环"]
  E --> F["评估护栏与安全边界"]
  F --> G["用于教学和科研 demo"]
\`\`\`

## RAG 与向量数据库

\`\`\`mermaid
flowchart TD
  A["医学资料/指南/论文"] --> B["切分为片段"]
  B --> C["Embedding 向量化"]
  C --> D["向量数据库"]
  E["用户问题"] --> F["问题向量化"]
  F --> D
  D --> G["召回相关资料"]
  G --> H["LLM 生成回答"]
  H --> I["带引用的教学/科研解释"]
\`\`\`

## 智能体 ReAct 循环

\`\`\`mermaid
flowchart LR
  A["目标"] --> B["Reason 推理下一步"]
  B --> C["Act 调用工具/检索/执行"]
  C --> D["Observe 观察结果"]
  D --> E{"是否完成?"}
  E -->|否| B
  E -->|是| F["输出并等待人工复核"]
\`\`\`

## 医疗 AI 安全边界

\`\`\`mermaid
flowchart TD
  A["AI 输出"] --> B{"用途是什么?"}
  B --> C["教学解释"]
  B --> D["科研辅助"]
  B --> E["临床诊疗"]
  C --> F["可用，但需注明来源和局限"]
  D --> G["可用，但需验证数据、方法和复现"]
  E --> H["不可直接使用，必须走临床验证与合规流程"]
  F --> I["人工复核"]
  G --> I
  H --> I
\`\`\`
`;
}

function buildPractice() {
  return `---
title: "医护练习"
description: "AI 概念自测、智能体场景判断和提示词模板"
---

# 医护练习

![医护 AI 练习闭环](/assets/illustrations/12-safety-guardrails.png)

## 练习 1：判断一个任务需不需要智能体

| 任务 | 更适合普通 LLM | 更适合智能体 | 为什么 |
|---|---|---|---|
| 改写一段患者宣教文字 | 是 | 否 | 一次性生成即可 |
| 检索 10 篇论文并做结构化摘要 | 否 | 是 | 需要检索、筛选、迭代 |
| 根据真实患者数据给诊疗建议 | 否 | 否 | 涉及临床高风险，不可直接交给 AI |
| 生成教学病例的虚构数据 | 是 | 视情况 | 可用于教学，但要标明虚构 |

## 练习 2：AI 概念快速自测

1. Token 为什么不等于一个完整单词？
2. Embedding 为什么适合做语义检索？
3. Temperature 高低会如何影响回答？
4. RAG 为什么能减少“凭空编造”的风险？
5. 智能体为什么需要护栏和可观测？

## 医护专用提示词

\`\`\`text
我是医疗人员，不是专业工程师。请用通俗语言解释下面这个 AI 概念。
请按以下结构回答：
1. 一句话解释；
2. 用医疗工作中的类比说明；
3. 它在真实 AI 产品中有什么作用；
4. 医疗场景使用时有什么风险；
5. 我需要记住的 3 个关键词。
\`\`\`

\`\`\`text
请判断下面这个任务是否适合用 AI 智能体完成。
请从复杂度、是否需要外部工具、是否需要多轮检查、是否涉及患者安全、是否需要人工复核五个角度分析。
最后给出：普通 LLM / 智能体 / 不建议使用 AI，并说明原因。
\`\`\`
`;
}

function buildResources() {
  return `---
title: "资料库"
description: "术语卡、检查表、安全边界、带教模板"
---

# 资料库

![安全护栏](/assets/illustrations/12-safety-guardrails.png)

## 医护人员必须掌握的 AI 术语

| 术语 | 小白解释 | 医疗理解锚点 |
|---|---|---|
| Token | 模型读取文字前切成的小片段 | 像把病历拆成字段 |
| Embedding | 表达语义位置的数字向量 | 像把相似病例放得更近 |
| Context Window | 模型一次能看的上下文范围 | 像一次会诊能拿到的资料包 |
| Temperature | 控制输出随机性的参数 | 低温更像严谨摘要，高温更像头脑风暴 |
| RAG | 先检索资料再回答 | 像先查指南再写解释 |
| Agent | 能循环规划、行动、观察的系统 | 像有工具权限的助理，但必须有监督 |
| Guardrails | 护栏和限制 | 像处方权限、质控和安全红线 |
| Observability | 可观测性 | 像审计日志和质控记录 |

## 医疗 AI 8 项检查表

| 检查项 | 要问的问题 |
|---|---|
| 数据 | 是否真实、脱敏、合规、可追溯？ |
| 任务 | 是教学、科研、运营，还是临床诊疗？ |
| 证据 | 有没有验证集、基准测试或复现说明？ |
| 边界 | 是否写明不能用于诊断/治疗？ |
| 人工复核 | 是否要求专业人员审核输出？ |
| 安全 | 是否避免上传患者隐私和密钥？ |
| 监控 | 是否记录错误、成本、延迟和失败案例？ |
| 责任 | 出错后谁能解释、追踪和修正？ |
`;
}

function buildLocaleHome(locale, info) {
  return `---
title: "${info.title}"
description: "${info.desc}"
---

# ${info.title}

![AI learning map](/assets/illustrations/01-ai-learning-map.png)

${info.desc}

This website is structured like a course: lectures, visual maps, practice, resource library, and preserved original source pages.

## Start here

- [${info.cta}](/zh/)
- [Visual maps](/${locale}/visual-map)
- [Practice](/${locale}/practice/)
- [Resources](/${locale}/resources/)

## Course modules

1. AI foundations: neural networks, tokens, embeddings, attention, transformers.
2. How LLMs work: context window, temperature, hallucination, prompt engineering.
3. Improving models: transfer learning, fine-tuning, RLHF, LoRA, quantization.
4. Real systems: RAG, vector databases, agents, chain of thought, diffusion models.
5. AI agents: ReAct loop, context engineering, decomposition, guardrails, multi-agent design, observability, security.
`;
}

function buildLocaleSimplePage(info, title, zhLink) {
  return `---
title: "${title}"
---

# ${title}

${info.desc}

The complete material is preserved in the Chinese main course.

[${info.cta}](${zhLink})
`;
}

function normalizeForVitePress(markdown) {
  return markdown
    .replace(/^##\s+PART/gm, "## Part")
    .replace(/\\\./g, ".")
    .replace(/→/g, "→");
}

function writeMarkdown(relative, content) {
  const target = path.join(docs, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${content.trim()}\n`, "utf8");
}
