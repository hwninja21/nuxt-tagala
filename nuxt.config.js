import path from 'path'
import fs from 'fs'

require('dotenv').config()
const client = require('./plugins/contentful')

export default {
  target: 'server',
  server: {
    host: 'localhost',
    port: 3000
  },
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '@/node_modules/vue-select/dist/vue-select.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/contentful' },
    { src: '~/plugins/vue-select' },
    { src: '~/plugins/vue-lazyload' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  generate: {
    routes () {
      return client
        .getEntries({'content_type': 'category', include: 2})
        .then((entries) => {
          const final = entries.items.map((category) => {
            return category.fields.subcategories.map((subcategory) => {
              return subcategory.fields.products.map((item, index) => {
                return {
                  route: `/${category.fields.slug}/${subcategory.fields.slug}/${item.fields.slug}`,
                  payload: item
                }
              })
            })
          })
          const array = []
          for (const [index, value] of final.entries()) {
            for (const [indexSubcategory, valueSubcategory] of value.entries()) {
              for (const [indexProduct, valueProduct] of valueSubcategory.entries()) {
                array.push(valueProduct)
              }
            }
          }
          return array
      })
    }
  }
}
