---
title: "LLM 如何工作：聊天背后的上下文与随机性"
description: "20 个 AI 概念：LLM 如何工作：聊天背后的上下文与随机性"
---

# LLM 如何工作：聊天背后的上下文与随机性

![LLM 如何工作：聊天背后的上下文与随机性](/assets/illustrations/05-hallucination-temperature.png)

> 医护理解锚点：临床沟通里，同一句话放在不同病史背景下会有不同解释。LLM 也是这样依赖上下文窗口。温度、幻觉和提示词工程决定了它更像严谨病历摘要，还是更像开放头脑风暴。

## 本模块你要带走什么

- 先理解概念边界，再讨论产品和工具。
- 看到 AI 工具时，能判断它依赖的是模型本身、检索系统、工具调用，还是工作流控制。
- 面对医疗场景时，主动追问数据来源、验证方式、安全边界和人工复核。

## 5. Transformers

![Image](/assets/source/concepts-06.jpg)

The architecture powering almost every AI model today.

Introduced in 2017 in a paper called "Attention Is All You Need."

The breakthrough: instead of reading text one word at a time, process everything in parallel using attention.

How it works: → Text → Tokens → Embeddings → Stacked attention layers → Output

Each layer refines understanding: → Early layers: grammar, basic structure → Middle layers: word relationships → Deep layers: complex reasoning

The result: massively faster training and far better outputs.

GPT. Claude. Gemini. Llama. Mistral.

All transformers.

If you understand this one architecture, you understand modern AI.


---

## Part 2: HOW LLMs WORK (What's actually happening when you chat with AI)


---

## 6. LLMs (Large Language Models)

![Image](/assets/source/concepts-07.jpg)

An LLM is a transformer trained on a massive amount of text.

Books. Websites. Code. Wikipedia. Reddit.

Trillions of tokens.

The training task sounds too simple to be powerful:

→ Predict the next token.

That's it.

But when you repeat this across trillions of examples, something remarkable happens.

The model learns grammar. Then reasoning. Then how to write code, translate languages, solve math problems.

No one told it to do any of that.

It emerged from next-token prediction at scale.

"Large" = hundreds of billions of parameters. Training cost = millions of dollars.

ChatGPT, Claude, Gemini → all LLMs.


---

## 7. Context Window

![Image](/assets/source/concepts-08.jpg)

Every AI model has a memory limit.

It's called the context window.

It's the maximum number of tokens the model can "see" at once — your message + its response + conversation history.

Early GPT: ~4,000 tokens. GPT-4: 128,000 tokens. Claude 3.5: 200,000 tokens. Gemini 1.5 Pro: 1,000,000 tokens.

Bigger window = more context = better answers.

But there's a catch.

Models don't read everything equally.

They focus on the beginning and end of the context.

The middle? Often ignored.

This is called the "Lost in the Middle" problem.

Big context window ≠ perfect memory.

Understanding this explains why AI sometimes "forgets" something you clearly mentioned.


---

## 8. Temperature

![Image](/assets/source/concepts-09.jpg)

When AI generates text, it doesn't just pick the most likely next word every time.

It has a dial called temperature.

→ Temperature = 0: always picks the safest, most predictable word → Temperature = 1: picks more creatively, more variety → Temperature = 2+: gets wild, sometimes incoherent

Low temperature → use for: code, facts, summaries High temperature → use for: brainstorming, creative writing, variations

Most tools set this for you automatically.

But understanding it explains why sometimes AI seems "boring" and sometimes it surprises you.
