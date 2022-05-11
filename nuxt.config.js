import path from 'path'
import fs from 'fs'

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  server: process.env.DEV
    ? {
        host: process.env.HOST,
        port: process.env.PORT
      }
    : {
        host: process.env.HOST,
        port: process.env.PORT,
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },

  css: [
  ],

  plugins: [
  ],

  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http'
  ],

  http: {
    baseURL: process.env.BASE_URL,
    rejectUnauthorized: false
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
