import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import '../src/assets/main.scss'

import Home from '../src/components/Home'
import BlogHome from '../src/components/BlogHome'
import BlogPost from '../src/components/BlogPost'
import Page from './components/Page'

import App from './App.vue'

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

// Vue.component('blog-post', {
//   data: function () {
//     return {
//       postFontSize: 1,
//       post:[],
//       img:[]
//     }
//   },
//   methods: {
//     getPost () {
//       axios({
//         method: 'get',
//         url: 'http://vue-wp.test/wp-json/wp/v2/posts',
//       }).then(response => {
//         const allPosts = response.data
//         const todaysDate = Date()
//         console.log('date', todaysDate)
//         console.log('all Posts', allPosts)
//         const postsArrayId = allPosts.sort(function (a, b) {
//           return b.id - a.id;
//         });
//         console.log('sorted', postsArrayId[0].id)

//         axios({
//           method: 'get',
//           url: 'http://vue-wp.test/wp-json/wp/v2/posts/'+postsArrayId[0].id+'?_embed'
//         }).then(response => {
//           const singlePost = response.data
//           const imgUrl = singlePost._embedded["wp:featuredmedia"][0].source_url
//           console.log('img url', imgUrl)
//           this.post = singlePost
//           this.img = imgUrl
//         })
//       })
//     }
//   },
//   created() {
//     this.getPost()
//   },
//   template: `
//     <div class="blog-post">
//       <h3 v-if="post.title">{{post.title.rendered}}</h3>
//       <div class="content" v-if="post.content" v-html="post.content.rendered"></div>
//       <img :src="img" />
//     </div>
//   `
// })

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
