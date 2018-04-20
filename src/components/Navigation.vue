<template>
  <div class="navigation">
    <ul>
      <li><router-link :to="{ name: 'home' }" active-class="my-active-class" exact>Home</router-link></li>
      <li v-if="pageLoop.length" v-for="page in pageLoop" :key="page.slug">
        <router-link :to="{ name: 'page', params: { slug: page.slug }}">{{page.title.rendered}}</router-link>
      </li>
      <li><router-link :to="{ name: 'blog.home' }">Blog</router-link></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'navigation',
    data () {
      return {
        msg: 'This is the greet component!',
        pageLoop: []
      }
    },
    methods: {
      getPages () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/pages'
        }).then(response => {
          const allPages = response.data

          function findHomePage(element) {
            return element.slug === 'home'
          }
          const homeIndex = allPages.findIndex(findHomePage)

          if (homeIndex >= 0) {
            allPages.splice(homeIndex,1)
          }

          const pageLoop = []
          allPages.sort((x,y) => x.menu_order - y.menu_order).forEach(element => {
            console.log('loop', element)
            pageLoop.push(element)
          });
          console.log('page loop', pageLoop)
          this.pageLoop = pageLoop
        })
      }
    },
    computed: {
      // pages() {
      //   return this.pageLoop.sort((x,y) => x.menu_order - y.menu_order)
      // }
    },
    created() {
      this.getPages()
      console.log('dillon', this.$router)
    }
  }
</script>
