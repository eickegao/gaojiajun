// 站点配置 - 修改这里的值来自定义你的博客
export const SITE = {
  title: "Gao Jiajun",
  description: {
    en: "Personal blog of Gao Jiajun",
    zh: "高加骏的个人博客",
  },
  url: "https://gaojiajun.me",
  defaultLang: "en" as const,
  supportedLangs: ["en", "zh"] as const,

  // 个人信息
  author: {
    name: {
      en: "Gao Jiajun",
      zh: "高加骏",
    },
    avatar: "/avatar.jpg",
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
      { text: "Home", href: "/" },
      { text: "Blog", href: "/blog/" },
      { text: "About", href: "/about/" },
    ],
    zh: [
      { text: "首页", href: "/zh/" },
      { text: "博客", href: "/zh/blog/" },
      { text: "关于", href: "/zh/about/" },
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
