const SITE = {
  title: 'Jakho',
  author: 'Jakho Luo',
  occupation: 'Designer Advocate at Figma.',
  intro: 'Loves horror movies, electronic music, ass-numbing hot sauce, art shit and code stuff.',
  timezone: 'Asia/Shanghai',
  appearance: 'auto', // ['light', 'dark', 'auto']
  apiCache: {
    enable: true,
    ms: 600000
  },
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
    description: ''
  },
  models: {
    // 'csdn': {
    //   username: 'MarkerHub'
    // },
    // 'weibo': {
    //   userid: '2510158465'
    // },
    'xlog': {
      username: 'jakho'
    },
    'cusdis': {
      appId: '', // data-app-id
      host: 'https://cusdis.com', // data-host, change this if you're using self-hosted version
      scriptSrc: 'https://cusdis.com/js/cusdis.es.js' // change this if you're using self-hosted version
    }
  },
  home: [
    {
      title: '文章',
      type: 'xlog'
    },
    // {
    //   title: '文章',
    //   type: 'csdn'
    // },
    // {
    //   title: '微博',
    //   type: 'weibo'
    // },
  ],
  pages: [
    {
      name: 'GuestBook',
      permalink: 'guestbook',
      content: [
        {
          title: '留言本',
          type: 'cusdis',
        }
      ]
    }
  ],
  analytics: {
    umami: {
      id: ''
    },
    ga: {
      measurementId: '' // e.g: G-XXXXXXXXXX
    },
    baidu: {
      id: ''
    },
    custom: {
      scriptSrc: '',
      defer: true
    }
  },
}

module.exports = SITE