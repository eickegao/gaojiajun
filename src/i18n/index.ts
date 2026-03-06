import { SITE, type Lang } from "../config";

// UI 翻译文本
const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.about": "About",
    "blog.title": "Blog",
    "blog.readMore": "Read more",
    "blog.minRead": "min read",
    "blog.allPosts": "All Posts",
    "blog.taggedWith": "Tagged with",
    "blog.backToBlog": "Back to blog",
    "tags.title": "Tags",
    "about.title": "About",
    "home.latestPosts": "Latest Posts",
    "home.viewAll": "View all posts",
    "footer.rights": "All rights reserved.",
    "lang.switch": "中文",
  },
  zh: {
    "nav.home": "首页",
    "nav.blog": "博客",
    "nav.about": "关于",
    "blog.title": "博客",
    "blog.readMore": "阅读更多",
    "blog.minRead": "分钟阅读",
    "blog.allPosts": "所有文章",
    "blog.taggedWith": "标签",
    "blog.backToBlog": "返回博客",
    "tags.title": "标签",
    "about.title": "关于",
    "home.latestPosts": "最新文章",
    "home.viewAll": "查看全部",
    "footer.rights": "保留所有权利。",
    "lang.switch": "English",
  },
};

export function getLangFromUrl(url: URL): Lang {
  const pathLang = url.pathname.split("/")[1];
  if (SITE.supportedLangs.includes(pathLang as Lang)) {
    return pathLang as Lang;
  }
  return SITE.defaultLang;
}

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? key;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === SITE.defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 获取当前页面对应的另一语言路径
export function getSwitchLangPath(currentPath: string, currentLang: Lang): string {
  const targetLang = currentLang === "en" ? "zh" : "en";
  if (currentLang === SITE.defaultLang) {
    // en -> zh: add /zh/ prefix
    return `/${targetLang}${currentPath}`;
  } else {
    // zh -> en: remove /zh/ prefix
    return currentPath.replace(`/${currentLang}`, "") || "/";
  }
}
