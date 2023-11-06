import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(taskLists)
    }
  },
  title: "Daguanren知识库",
  description: "A VitePress Site",
  themeConfig: {
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    },
    editLink: {
      text: '在GitHub上编辑此页',
      pattern: 'https://github.com/daguanren21'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Jousing'
    },
    nav: [
      { text: '构建Cli', link: '/guide/', activeMatch: '/guide/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '构建Cli',
          collapsed: true,
          items: [
            { text: '概述', link: '/guide/' },
            { text: '实践', link: '/guide/play' },
            { text: '测试与发布', link: '/guide/publish' }
          ]
        },
        {
          text: '构建文档',
          collapsed: true,
          items: [
            { text: 'markdown', link: '/guide/markdown' },
            { text: 'vitepress', link: '/guide/vitepress' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
