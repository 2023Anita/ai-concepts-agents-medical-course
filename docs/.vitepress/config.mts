import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const base = "/ai-concepts-agents-medical-course/";

const languageItems = [
  { text: "🇨🇳 中文", link: "/zh/" },
  { text: "🇺🇸 English", link: "/en/" },
  { text: "🇯🇵 日本語", link: "/ja/" },
  { text: "🇰🇷 한국어", link: "/ko/" },
  { text: "🇫🇷 Français", link: "/fr/" },
  { text: "🇩🇪 Deutsch", link: "/de/" }
];

function navFor(prefix: string, labels: [string, string, string, string]) {
  const [home, maps, practice, resources] = labels;
  return [
    { text: home, link: `/${prefix}/` },
    { text: maps, link: `/${prefix}/visual-map` },
    { text: practice, link: `/${prefix}/practice/` },
    { text: resources, link: `/${prefix}/resources/` },
    { text: "🌐", items: languageItems }
  ];
}

export default withMermaid(
  defineConfig({
    base,
    lang: "zh-CN",
    title: "医护 AI 概念与智能体课程",
    description: "给医护人员、医学生和医疗科研人员的 AI 概念与智能体入门课程站",
    cleanUrls: true,
    lastUpdated: true,
    locales: {
      zh: {
        label: "中文",
        lang: "zh-CN",
        title: "医护 AI 概念与智能体课程",
        description: "从 20 个 AI 概念到智能体系统，给医护人员的可视化入门课",
        themeConfig: { nav: navFor("zh", ["课程首页", "框架图", "练习", "资料库"]) }
      },
      en: {
        label: "English",
        lang: "en-US",
        title: "AI Concepts and Agents for Healthcare",
        description: "A practical AI concepts and agents course for healthcare beginners.",
        themeConfig: { nav: navFor("en", ["Home", "Maps", "Practice", "Resources"]) }
      },
      ja: {
        label: "日本語",
        lang: "ja-JP",
        title: "医療者のための AI 概念とエージェント入門",
        description: "医療者向け AI 概念とエージェントの入門コース。",
        themeConfig: { nav: navFor("ja", ["ホーム", "図解", "練習", "資料"]) }
      },
      ko: {
        label: "한국어",
        lang: "ko-KR",
        title: "의료인을 위한 AI 개념과 에이전트 입문",
        description: "의료 초보자를 위한 AI 개념 및 에이전트 실전 코스.",
        themeConfig: { nav: navFor("ko", ["홈", "지도", "실습", "자료"]) }
      },
      fr: {
        label: "Français",
        lang: "fr-FR",
        title: "Concepts IA et agents pour soignants",
        description: "Un cours pratique sur les concepts IA et les agents pour les débutants en santé.",
        themeConfig: { nav: navFor("fr", ["Accueil", "Cartes", "Exercice", "Ressources"]) }
      },
      de: {
        label: "Deutsch",
        lang: "de-DE",
        title: "KI-Konzepte und Agenten für medizinische Anfänger",
        description: "Ein praktischer Kurs zu KI-Konzepten und Agenten für medizinische Einsteiger.",
        themeConfig: { nav: navFor("de", ["Start", "Karten", "Übung", "Ressourcen"]) }
      }
    },
    themeConfig: {
      logo: "/assets/illustrations/01-ai-learning-map.png",
      nav: navFor("zh", ["课程首页", "框架图", "练习", "资料库"]),
      sidebar: {
        "/zh/": [
          {
            text: "开始学习",
            items: [
              { text: "课程首页", link: "/zh/" },
              { text: "框架图与流程", link: "/zh/visual-map" }
            ]
          },
          {
            text: "20 个 AI 概念",
            items: [
              { text: "基础原理", link: "/zh/concepts/01-foundations" },
              { text: "LLM 如何工作", link: "/zh/concepts/02-llm-workflow" },
              { text: "模型如何变好", link: "/zh/concepts/03-model-improvement" },
              { text: "真实 AI 系统", link: "/zh/concepts/04-real-systems" }
            ]
          },
          {
            text: "AI 智能体",
            items: [
              { text: "入门篇", link: "/zh/agents/01-foundations" },
              { text: "系统设计", link: "/zh/agents/02-system-design" },
              { text: "生产部署与安全", link: "/zh/agents/03-production" }
            ]
          },
          {
            text: "练习与资料",
            items: [
              { text: "医护练习", link: "/zh/practice/" },
              { text: "资料库", link: "/zh/resources/" },
              { text: "20 个 AI 概念原文", link: "/zh/original/20-ai-concepts" },
              { text: "AI 智能体原文", link: "/zh/original/ai-agents-course" }
            ]
          }
        ]
      },
      search: { provider: "local" },
      outline: { level: [2, 3], label: "本页目录" },
      docFooter: { prev: "上一页", next: "下一页" },
      lastUpdated: { text: "最后更新" },
      footer: {
        message: "仅供教学与科研学习，不用于临床诊断、治疗决策或急救场景。",
        copyright: "Copyright © 2026 Anita"
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/2023Anita/ai-concepts-agents-medical-course" }
      ]
    },
    mermaid: {
      theme: "base",
      themeVariables: {
        primaryColor: "#f7efe2",
        primaryTextColor: "#21342f",
        primaryBorderColor: "#7fa89a",
        lineColor: "#b46a55",
        secondaryColor: "#e7f0ea",
        tertiaryColor: "#fffaf1"
      }
    }
  })
);
