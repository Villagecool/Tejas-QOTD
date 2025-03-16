import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tejas Quote of the Day",
  description: "QOTD by Tejas",
  base: '/Tejas-QOTD',
  themeConfig: {

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
