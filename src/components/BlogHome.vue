<template>
  <div id="blog-home">
      <h1>Latest Posts</h1>
      <!-- Create `v-for` and apply a `key` for Vue. Here we are using a combination of the slug and index. -->
      <div class="blogroll" v-for="post in posts" :key="post.slug">

        <div class="__blogroll-img" v-if="post._embedded['wp:featuredmedia']" :key="post.id">
          <template  v-for="featuredMedia in post._embedded['wp:featuredmedia']">
            <img :src="featuredMedia.source_url" :key="featuredMedia.id">
          </template>
        </div>
        <div class="__blogroll-img" v-else :key="post.id">
          <img src="http://via.placeholder.com/250x250"  alt="">
        </div>


        <div class="__blogroll-content">
          <h2>{{ post.title.rendered }}</h2>
          <p v-html="post.excerpt.rendered"></p>
          <router-link :to="{name:'blog-post', params: { slug: post.slug }}">
            Read More
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        posts: []
      }
    },
    methods: {
      getPost() {
        axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
        .then(({data}) => {
          return axios.all(data.map((post) =>
            axios.get(`http://vue-wp.test/wp-json/wp/v2/posts/${post.id}?_embed`)
              .then(response => response.data))
          )
        }).then(allPosts => {
          this.posts = allPosts
        })
      }
    },
    created () {
      this.getPost()
    }
  }
  // const imgUrl = singlePost._embedded["wp:featuredmedia"][0].source_url
</script>
