<template>
  <div id="blog-post">

    <h1 v-if="singlePostFull.title">{{ singlePostFull.title.rendered }}</h1>

    <div v-if="singlePostFull.content" v-html="singlePostFull.content.rendered"></div>

    <div v-if="singlePostFull._embedded">
      <div v-for="featuredMedia in singlePostFull._embedded['wp:featuredmedia']" :key="featuredMedia.id">
        <img v-if="featuredMedia.source_url" :src="featuredMedia.source_url">
      </div>
    </div>

    <div v-if="firstPost">
      <router-link :to="{name:'blog-post', params: { slug: previousPostUrl.slug }}" class="button previous">
      {{previousPostUrl.title.rendered}} | Previous Post
    </router-link>
    </div>

    <div v-if="lastPost">
      <router-link :to="{name:'blog-post', params: { slug: nextPostUrl.slug }}" class="button next">
      {{nextPostUrl.title.rendered}} | Next Post
    </router-link>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['slug'],
    name: 'blog-post',
    data() {
      return {
        allPosts: [],
        singlePostFull: []
      }
    },
    methods: {
      getAllPosts () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/posts',
        }).then(({data}) => {
          this.allPosts = data
        })
      },

      singlePostFullData () {
        axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
        .then(({data}) => {
          this.allPosts = data
          return axios.all(data.map((post) =>
            axios.get(`http://vue-wp.test/wp-json/wp/v2/posts/${post.id}?_embed`)
              .then(response => response.data))
          )
        }).then(allPosts => {
          const singlePost = allPosts.find(single => single.slug === this.slug)
          this.singlePostFull = singlePost
        })
      }

    },
    computed: {
      postId() {
        return this.singlePostFull.id
      },
      idArray() {
        return this.allPosts.map(a => a.id)
      },
      closestHigh() {
        return Math.max.apply(null, this.idArray)
      },
      closestLow() {
        return Math.min.apply(null, this.idArray)
      },
      previousPostId () {
        let previous = this.closestLow
        for(var i=0; i < this.idArray.length; i++) {
          if(this.idArray[i] < this.postId && this.idArray[i] > previous  ) previous = this.idArray[i]
        }
        return previous
      },
      nextPostId () {
        let next = this.closestHigh
        for(var i=0; i < this.idArray.length; i++){
          if(this.idArray[i] > this.postId && this.idArray[i] < next) next = this.idArray[i]
        }
        return next
      },
      singlePost () {
        return this.allPosts.find(single => single.slug === this.slug)
      },
      nextPostUrl () {
        return this.allPosts.find(url => url.id === this.nextPostId)
      },
      previousPostUrl () {
        return this.allPosts.find(url => url.id === this.previousPostId)
      },
      firstPost() {
        let firstPost = true
        if(this.previousPostId === this.postId) {firstPost = false} 
        return firstPost
      },
      lastPost() {
        let lastPost = true
        if(this.nextPostId === this.postId) {lastPost = false}
        return lastPost
      }
    },
    watch: {
       $route(to, from) {
        this.getAllPosts ()
        this.singlePostFullData ()

      }
    },
    created() {
      this.getAllPosts ()
      this.singlePostFullData ()

    }
  }
</script>
