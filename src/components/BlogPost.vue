<template>
  <div id="blog-post">

    <h1 v-if="singlePostFull.title">{{ singlePostFull.title.rendered }}</h1>

    <div v-if="singlePostFull.content" v-html="singlePostFull.content.rendered"></div>

    <div v-if="singlePostFull._embedded">
      <div v-for="featuredMedia in singlePostFull._embedded['wp:featuredmedia']" :key="featuredMedia.id">
        <img v-if="featuredMedia.source_url" :src="featuredMedia.source_url">
      </div>
    </div>




    <div v-if="previousPost">
      Yes
      <router-link :to="{name:'blog-post', params: { slug: previousPost.slug }}" class="button previous">
      {{previousPost.title.rendered}} | Previous Post
    </router-link>
    </div>
    <div v-else >No</div>

    <div v-if="nextPost">
      Yes
      <router-link :to="{name:'blog-post', params: { slug: nextPost.slug }}" class="button next">
      {{nextPost.title.rendered}} | Next Post
    </router-link>
    </div>
    <div v-else >No</div>

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
      previousPost () {
        return this.allPosts.find(d1 => d1.date < this.singlePost.date)
      },
      nextPost () {
        return this.allPosts.find(d1 => d1.date > this.singlePost.date)
      },
      singlePost () {
        return this.allPosts.find(single => single.slug === this.slug)
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

    },
    beforeCreate: function () {
    }
  }
</script>
