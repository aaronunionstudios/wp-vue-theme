<template>
  <div class="home">
    <singleblogpost></singleblogpost>
    <div class="content">
      <h1 v-if="page.title">{{ page.title.rendered }}</h1>
      <div v-if="page.content" v-html="page.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import singleblogpost from './SingleBlogPost'
  export default {
    name: 'home',
    components: {
      singleblogpost,
    },
    data () {
      return {
        page: {},
        slug: 'home'
      }
    },
    methods: {
      getPage () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/pages',
        }).then(response => {
          const allPages = response.data
          const singlePage = allPages.find(single => single.slug === this.slug)
          this.page = singlePage
        })
      }
    },
    created() {
      this.getPage()
    },
  }
</script>
