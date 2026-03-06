import { getCollection } from "astro:content";
import type { Lang } from "../config";

export async function getBlogPosts(lang: Lang) {
  const posts = await getCollection("blog", ({ data }) => data.lang === lang);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllTags(lang: Lang): Promise<string[]> {
  const posts = await getBlogPosts(lang);
  const tags = new Set<string>();
  posts.forEach((post) => post.data.tags.forEach((tag) => tags.add(tag)));
  return [...tags].sort();
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
