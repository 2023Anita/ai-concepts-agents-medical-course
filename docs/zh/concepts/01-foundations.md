---
title: "基础原理：AI 如何把输入变成预测"
description: "20 个 AI 概念：基础原理：AI 如何把输入变成预测"
---

# 基础原理：AI 如何把输入变成预测

![基础原理：AI 如何把输入变成预测](/assets/illustrations/02-neural-network.png)

> 医护理解锚点：把它当成医学检验流程：输入是病史、文本、图像或结构化数据，中间层不断提取线索，输出是概率化预测。重点不是神秘智能，而是大量参数在学习统计关系。

## 本模块你要带走什么

- 先理解概念边界，再讨论产品和工具。
- 看到 AI 工具时，能判断它依赖的是模型本身、检索系统、工具调用，还是工作流控制。
- 面对医疗场景时，主动追问数据来源、验证方式、安全边界和人工复核。

![Image](/assets/source/concepts-01.jpg)

大家都在用 AI。

几乎没人真正理解它们的工作原理。

人们随口抛出诸如 Transformer、嵌入、RAG、智能体、RLHF 之类的词汇……

……好像人人都已经懂了似的。

大多数人并不了解。

说实话？

一旦你掌握了这些思维模型，AI 其实并不复杂。

ChatGPT、Claude、Midjourney、Cursor、编程智能体。

一旦你理解了以下20个概念，它们就都变得清晰了。

无需博士学位，没有专业术语。只有简洁的解释与直观的图示。

请收藏此文。你日后定会再次用到。


---

## 第一部分：人工智能的实际运作原理（一切构建的基础）

**1. 神经网络**

![Image](/assets/source/concepts-02.jpg)

每个 AI 模型的大脑。

神经网络是一个由多层组成的管道。

→ 数据进入输入层 → 经过隐藏层 → 以预测结果输出

每个连接都有一个"权重"——一个微小的分数，控制着一个神经元对下一个神经元的影响程度。

训练 = 调整数十亿个这样的权重，直到输出准确为止。

简单的想法。规模惊人。

GPT-4 拥有约 1.8 万亿个参数。Claude 3 Opus 拥有数千亿个参数。

都源于同一个基本概念：具有可调连接的分层神经元。


---

## 2. 分词

![Image](/assets/source/concepts-03.jpg)

在 AI 读取你的文本之前，它会将其拆解成称为“词元”的小片段。

不总是完整的单词。

"playing" → "play" + "ing" "ChatGPT" → "Chat" + "G" + "PT" "dog" → "dog"（保持完整）

为什么不直接使用完整的词语？

语言是混乱的。新词、拼写错误、混合语言。一个固定的词汇表会庞大到无法实现。

Token 是可重复使用的基本构建块。

即使模型从未见过某个单词，它也能通过将其拆解为熟悉的片段来理解。

粗略规则：1 个 token ≈ 0.75 个单词。

1000 个 token ≈ 750 个单词。


---

## 3. 嵌入（Embeddings）

![Image](/assets/source/concepts-04.jpg)

文本被分词后，每个词元都会变成一个数字。

这个数字就是嵌入——一个代表语义的向量。

把它想象成词语界的谷歌地图。

→ "医生"和"护士"紧密相邻 → "医生"和"披萨"相距甚远 → "国王"减去"男人"加上"女人" ≈ "女王"

模型并不像你那样理解词语。

它能理解距离与方向。

这正是以下技术的核心驱动力：→ 语义搜索 → 推荐系统 → RAG（检索增强生成）系统

所有“理解意图”的技术，底层都使用了嵌入。


---

## 4. 注意力机制

![Image](/assets/source/concepts-05.jpg)

“苹果”这个词在不同语境下含义不同：

→ “我吃了一个苹果” → 水果 → “我买了苹果股票” → 公司

仅靠词嵌入无法解决这个问题。

Attention can.

Attention lets every word look at every other word in a sentence and decide what matters.

In "She bought shares in Apple": → "Apple" pays high attention to "shares" and "bought" → Model concludes: company, not fruit

Before attention, models read left-to-right. Slow. Limited.

After attention, models see the whole sentence at once.

This single idea unlocked modern AI.
