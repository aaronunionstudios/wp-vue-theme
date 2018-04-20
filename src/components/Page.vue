<template>
  <div id="page">
    <h1 v-if="page.title">{{ page.title.rendered }}</h1>
    <!-- <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4> -->
    <div v-if="page.content" v-html="page.content.rendered"></div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['slug'],
    name: 'page',
    data() {
      return {
        page: {},
        next: {},
        previousPostData: {},
        nextPostData: {}
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
    watch: {
      $route(to, from) {
        this.getPage()
      }
    },
    created() {
      this.getPage()
    },
  }
</script>
