---
title: "真实 AI 系统：RAG、向量库、智能体与扩散模型"
description: "20 个 AI 概念：真实 AI 系统：RAG、向量库、智能体与扩散模型"
---

# 真实 AI 系统：RAG、向量库、智能体与扩散模型

![真实 AI 系统：RAG、向量库、智能体与扩散模型](/assets/illustrations/01-ai-learning-map.png)

> 医护理解锚点：真实产品很少只靠一个模型。它们通常把检索、数据库、工具调用、工作流和安全控制接在一起。医护人员要学会看系统边界，而不是只看模型名字。

## 本模块你要带走什么

- 先理解概念边界，再讨论产品和工具。
- 看到 AI 工具时，能判断它依赖的是模型本身、检索系统、工具调用，还是工作流控制。
- 面对医疗场景时，主动追问数据来源、验证方式、安全边界和人工复核。

## 13. RLHF (Reinforcement Learning from Human Feedback)

![Image](/assets/source/concepts-14.jpg)

Fine-tuning makes models specialized.

RLHF is what makes them feel helpful and safe.

Without it: the model just predicts text. Fluent, but not aligned.

With it: the model learns what humans actually prefer.

Here's how it works:

→ Show model a prompt → Model generates multiple responses → Humans rank the responses → Model learns to prefer what humans prefer

Repeat thousands of times.

The model builds a sense of "good answer": → Clear → Helpful → Honest → Safe

This is why ChatGPT and Claude feel like assistants — not random text generators.

Without RLHF, they'd still be impressive. But far less useful, less trustworthy, and much harder to control.


---

## 14. LoRA (Low-Rank Adaptation)

![Image](/assets/source/concepts-15.jpg)

Fine-tuning is powerful but expensive.

Updating billions of parameters needs multiple GPUs and serious infrastructure.

LoRA solves this.

Instead of changing the whole model, LoRA:

→ Keeps the original model frozen → Adds tiny trainable layers on top → These layers are a fraction of the full model size

The insight: most fine-tuning changes are small.

You don't need to rewrite the whole model.

You just need small targeted adjustments.

Results: → Fine-tuning on a single consumer GPU: possible → Store one base model + swap different LoRA adapters: practical → Multiple specialized models without massive storage: done

LoRA is why open-source AI exploded.

Suddenly anyone could fine-tune powerful models on a laptop.


---

## 15. Quantization

![Image](/assets/source/concepts-16.jpg)

Models are getting huge.

Running them requires serious memory and compute.

Quantization makes them smaller and cheaper to run.

How: reduce the precision of each weight.

A weight stored in full precision uses 32 bits.

Quantized to 4-bit → 8x smaller.

Crazy thing: the quality drop is often surprisingly small.

This is why you can now: → Run LLaMA on a MacBook → Run Mistral locally on a consumer GPU → Use powerful models on a phone

Without quantization, large models would stay locked in data centers.

With quantization, they run on your machine.


---

## Part 4: HOW REAL AI SYSTEMS ARE BUILT (What's behind the products you actually use)


---

## 16. RAG (Retrieval-Augmented Generation)

![Image](/assets/source/concepts-17.jpg)

LLMs hallucinate because they answer from memory.

RAG fixes this by letting them look things up first.

How it works:

1. User asks a question
2. System searches a knowledge base for relevant documents
3. Those documents are passed to the model as context
4. Model answers using real information — not guesses

Think of it like:

→ Closed-book exam (no RAG): answers from memory, often wrong → Open-book exam (RAG): checks the source, far more accurate

Why it's powerful: → No retraining when your data changes — just update the documents → Model always works with current, accurate information → Reduces hallucination dramatically

Every serious AI product uses RAG.

Customer support bots. Legal tools. Medical assistants. Internal knowledge bases.


---

## 17. Vector Databases

![Image](/assets/source/concepts-18.jpg)

RAG needs to find the right documents fast.

But how do you search millions of documents by meaning — not just keywords?

Vector databases.

Here's how they work:

1. Every document gets converted into an embedding (a vector of numbers)
2. These vectors get stored in the database
3. When a user asks a question, the question also becomes a vector
4. Database finds vectors closest to the question vector
5. Returns most semantically similar documents

Why this is better than keyword search:

→ "heart disease treatment" finds documents about "cardiac care protocols" → Even though the exact words don't match, the meaning does

Tools: Pinecone, Qdrant, Weaviate, pgvector

Vector databases are what makes AI systems "understand" — not just match strings.
