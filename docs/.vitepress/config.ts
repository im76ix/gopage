import { defineConfig } from 'vitepress'

const META_URL = 'https://im76ix.github.io/gopage/'
const META_TITLE = 'Go page'
const META_DESCRIPTION = 'Uniapp go page.'

export default defineConfig({
  base: '/oopsoh/',
  title: META_TITLE,
  description: META_DESCRIPTION,
  lang: 'en-US',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:title', content: META_TITLE }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Github', link: 'https://github.com/im76ix/gopage' },
    ],

    sidebar: [
      {
        text: 'Guide',
        children: [
          {
            text: 'Install',
            link: '/',
          },
        ],
      },
    ],
  },
})
