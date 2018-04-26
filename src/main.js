import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from '../src/components/Home'
import BlogHome from '../src/components/BlogHome'
import BlogPost from '../src/components/BlogPost'
import Page from './components/Page'
import App from './App.vue'

import '../src/assets/main.scss'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog/',
    name: 'blog.home',
    component: BlogHome
  },
  {
    path: '/blog/:slug',
    props: (route) => ({slug: (route.params.slug)}),
    name: 'blog-post',
    component: BlogPost
  },
  {
    path: '/page/:slug',
    props: (route) => ({slug: (route.params.slug)}),
    name: 'page',
    component: Page
  },

  ]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  linkActiveClass: 'my-active-class',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    siteData: [],
  },
  router,
  template: '<app></app>',
  components: {
    App
  },
  mounted () {
    axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
      .then((response) => {
        this.siteData = response.data
      })
  }
  // render: h => h(App)
})
