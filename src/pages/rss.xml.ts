import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../config";

export async function GET(context: any) {
  const zhPosts = await getCollection("blog", ({ data }) => data.lang === "zh");
  const enPosts = await getCollection("blog", ({ data }) => data.lang === "en");
  const allPosts = [...zhPosts, ...enPosts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${SITE.title.zh} / ${SITE.title.en}`,
    description: SITE.description.en,
    site: context.site,
    items: allPosts.map((post) => {
      const lang = post.data.lang;
      const prefix = lang === SITE.defaultLang ? "" : `/${lang}`;
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `${prefix}/blog/${post.id}/`,
      };
    }),
  });
}
