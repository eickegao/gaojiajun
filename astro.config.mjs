// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://eickegao.github.io",
  base: "/gaojiajun",
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
});
