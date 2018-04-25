<template>
  <div class="singleblogpost">
    <div class="blog-content">
      <div class="title" v-if="post.title">{{post.title.rendered}}</div>
      <div class="content" v-if="post.excerpt" v-html="post.excerpt.rendered"></div>
    </div>
    <div class="featured-image"><img :src="img" /></div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'singleblogpost',
    data: function () {
      return {
        post:[],
        img:[]
      }
    },
    methods: {
      getPost () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/posts',
        }).then(response => {
          const allPosts = response.data
          const todaysDate = Date()
          const postsArrayId = allPosts.sort(function (a, b) {
            return b.id - a.id;
          });

          axios({
            method: 'get',
            url: 'http://vue-wp.test/wp-json/wp/v2/posts/'+postsArrayId[0].id+'?_embed'
          }).then(response => {
            const singlePost = response.data
            const imgUrl = singlePost._embedded["wp:featuredmedia"][0].source_url
            this.post = singlePost
            this.img = imgUrl
          })
        })
      }
    },
    created() {
      this.getPost()
    },
  }
</script>
