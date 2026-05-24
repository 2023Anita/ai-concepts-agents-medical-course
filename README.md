# AI Concepts and Agents for Healthcare | 医护 AI 概念与智能体课程

<p align="center">
  <a href="#-中文">🇨🇳 中文</a> ·
  <a href="#-english">🇺🇸 English</a> ·
  <a href="#-日本語">🇯🇵 日本語</a> ·
  <a href="#-한국어">🇰🇷 한국어</a> ·
  <a href="#-français">🇫🇷 Français</a> ·
  <a href="#-deutsch">🇩🇪 Deutsch</a>
</p>

<p align="center">
  A warm, visual AI concepts and agents course for healthcare professionals, medical students, and clinical researchers.
</p>

[Start Learning](https://2023anita.github.io/ai-concepts-agents-medical-course/) · [中文主站](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/) · [框架图](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/visual-map) · [练习](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/practice/)

![AI Concepts and Agents Course](docs/public/assets/illustrations/00-illustration-contact-sheet.png)

## 🌐 Language Switch / 语言切换

| 语言 | 入口 | 说明 |
|---|---|---|
| 🇨🇳 中文 | [进入中文主站](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/) | 完整课程，保留两篇原文全文和全部图片 |
| 🇺🇸 English | [Open English guide](https://2023anita.github.io/ai-concepts-agents-medical-course/en/) | Guided overview for healthcare learners |
| 🇯🇵 日本語 | [日本語ガイドを見る](https://2023anita.github.io/ai-concepts-agents-medical-course/ja/) | 医療者向け導入ガイド |
| 🇰🇷 한국어 | [한국어 가이드 열기](https://2023anita.github.io/ai-concepts-agents-medical-course/ko/) | 의료인을 위한 안내 |
| 🇫🇷 Français | [Ouvrir le guide français](https://2023anita.github.io/ai-concepts-agents-medical-course/fr/) | Guide d'introduction pour soignants |
| 🇩🇪 Deutsch | [Deutschen Guide öffnen](https://2023anita.github.io/ai-concepts-agents-medical-course/de/) | Einstieg für medizinische Fachpersonen |

## 🇺🇸 English

This course explains AI concepts and AI agents for healthcare beginners. It starts with neural networks, tokens, embeddings, transformers, RAG, and vector databases, then moves into agents, context engineering, guardrails, observability, and security.

The Chinese main course preserves all original source content and images. Non-Chinese pages provide guided entry points.

## 🇯🇵 日本語

医療者向けに、AI の基本概念と AI エージェントをわかりやすく整理したコースです。完全な教材と原文画像は中国語メインコースに保存されています。

## 🇰🇷 한국어

의료인을 위한 AI 개념 및 AI 에이전트 입문 과정입니다. 전체 원문과 이미지는 중국어 메인 과정에 보존되어 있습니다.

## 🇫🇷 Français

Ce cours présente les concepts d'IA et les agents IA pour les professionnels de santé. Le cours chinois complet conserve tout le contenu source et les images originales.

## 🇩🇪 Deutsch

Dieser Kurs erklärt KI-Konzepte und KI-Agenten für medizinische Einsteiger. Der vollständige chinesische Kurs bewahrt alle Originalinhalte und Bilder.

## 🇨🇳 中文

这是一套面向医生、护士、医学生和医疗科研人员的 AI 概念与智能体入门课程站。

它不是泛程序员工程课，而是帮助医护人员建立 AI 判断力：

- 看懂神经网络、Token、Embedding、Transformer、RAG、向量数据库；
- 理解大模型为什么会幻觉，温度和上下文窗口为什么重要；
- 判断什么时候用普通 LLM，什么时候才需要 AI 智能体；
- 理解智能体的 ReAct 循环、上下文工程、任务分解、评估、记忆、护栏、多智能体系统；
- 在医疗教学与科研中主动识别患者数据、临床决策和安全边界。

## 小白学习路线

| 时间 | 学什么 | 入口 |
|---|---|---|
| 3 分钟 | 先看全局框架 | [框架图与流程](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/visual-map) |
| 30 分钟 | 完成医护场景练习 | [练习页](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/practice/) |
| 2 小时 | 系统学习 AI 概念与智能体 | [中文主站](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/) |
| 带教复用 | 使用术语卡、检查表、提示词 | [资料库](https://2023anita.github.io/ai-concepts-agents-medical-course/zh/resources/) |

## 内容来源与保留

本项目完整保留以下两篇源文档内容与全部图片：

- `/Users/anita/obsidian2026/raw/articles/2026 年你必须理解的 20 个 AI 概念.md`
- `/Users/anita/obsidian2026/raw/articles/AI 智能体：完整课程.md`

原文图片已本地化保存到 `docs/public/assets/source/`。新增 12 张日式温暖专业手绘风插图保存到 `docs/public/assets/illustrations/`。

## 本地运行

```bash
npm install
npm run docs:dev
```

构建：

```bash
npm run docs:build
```

## 安全声明

本课程仅用于教学与科研学习，不用于临床诊断、治疗决策或急救场景。任何医疗 AI 工具或智能体系统进入真实医疗流程前，都必须经过合规、伦理、数据安全、临床验证和专业人员复核。
