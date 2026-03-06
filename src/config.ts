// 站点配置 - 修改这里的值来自定义你的博客
export const SITE = {
  title: {
    en: "Solopreneur",
    zh: "独立营业中",
  },
  description: {
    en: "Personal blog of Solopreneur",
    zh: "独立营业中",
  },
  url: "https://eickegao.github.io",
  base: "/gaojiajun",
  defaultLang: "en" as const,
  supportedLangs: ["en", "zh"] as const,

  // 个人信息
  author: {
    name: {
      en: "Eric Gao",
      zh: "德州小高",
    },
    avatar: "/gaojiajun/avatar.jpg",
    bio: {
      en: "Welcome to my personal blog. I write about technology, life, and everything in between.",
      zh: "欢迎来到我的个人博客。我写关于技术、生活和其间一切的文章。",
    },
  },

  // 社交链接 - 留空则不显示
  socials: {
    github: "",
    twitter: "",
    linkedin: "",
    email: "",
  },

  // 导航菜单
  nav: {
    en: [
      { text: "Home", href: "/gaojiajun/" },
      { text: "Blog", href: "/gaojiajun/blog/" },
      { text: "About", href: "/gaojiajun/about/" },
    ],
    zh: [
      { text: "首页", href: "/gaojiajun/zh/" },
      { text: "博客", href: "/gaojiajun/zh/blog/" },
      { text: "关于", href: "/gaojiajun/zh/about/" },
    ],
  },

  // Google Analytics - 填入 ID 即可启用
  analytics: {
    googleAnalyticsId: "",
  },

  // Google AdSense - 填入 ID 即可启用
  ads: {
    googleAdsenseId: "",
    // 广告位 slot ID
    articleTopSlot: "",
    articleBottomSlot: "",
  },

  // 外观主题
  theme: {
    primaryColor: "#2563eb",
    accentColor: "#f59e0b",
    bgColor: "#ffffff",
    textColor: "#1a1a2e",
    cardBgColor: "#f8fafc",
    footerBgColor: "#1a1a2e",
  },

  // 每页文章数
  postsPerPage: 10,
};

export type Lang = (typeof SITE.supportedLangs)[number];
