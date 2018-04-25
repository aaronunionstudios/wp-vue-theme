<template>
  <div id="blog-post">
    <h1 v-if="singlePost.title">{{ singlePost.title.rendered }}</h1>
    <!-- <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4> -->

    <div class="featured-image" v-if="singlePost._embedded">
      <div v-for="featuredMedia in singlePost._embedded['wp:featuredmedia']" :key="featuredMedia.id">
        <img :src="featuredMedia.source_url">
      </div>
    </div>

    <div v-if="singlePost.content" v-html="singlePost.content.rendered"></div>

    <div v-if="next">{{next.id}}</div>

    <!-- <router-link v-if="previousPostData.title" :to="{name:'blog-post', params: { slug: previousPostData.slug }}" class="button previous">
      {{previousPostData.title.rendered}} | Previous Post
    </router-link>
    <router-link v-if="nextPostData.title" :to="{name:'blog-post', params: { slug: nextPostData.slug }}" class="button next">
      {{nextPostData.title.rendered}} | Next Post
    </router-link> -->


     <!-- <router-link v-if="testpreviousPost" :to="{name:'blog-post'}" class="button previous">
       | Previous Post
    </router-link>
    <router-link v-if="testnextPost" :to="{name:'blog-post'}" class="button next">
       | Next Post
    </router-link> -->

  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: {
      slug:''
    },
    name: 'blog-post',
    data() {
      return {
        previous: {},
        next: {},
        // previousPostData: {},
        // nextPostData: {},
        singlePost: {},
        allPosts: {},
        testJunk: {}
      }
    },
    methods: {
      setUp () {

        axios({
          method:'get',
          url:'http://vue-wp.test/wp-json/wp/v2/posts',
        }).then(({data}) => {

        })
        // console.log('myTest',myTest)
        // console.log('testAllPosts',testAllPosts)
        console.log('what',this.singlePost)
      },

      getPostRefactor() {
        axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
        .then(({data}) => {
          this.allPosts = data
          return axios.all(data.map((post) =>
            axios.get(`http://vue-wp.test/wp-json/wp/v2/posts/${post.id}?_embed`)
              .then(response => response.data))
          )
        }).then(allPosts => {
          const singlePost = allPosts.find(single => single.slug === this.slug)
          this.singlePost = singlePost
        })
      },
      testnextPost: function(myData) {
        console.log('myData',myData)
        // const next = myData.find(d2 => d2.date > this.singlePost.date)
        // return this.next = next
      },
      testpreviousPost: function() {
        const previous = this.allPosts.find(d2 => d2.date < this.singlePost.date)
        return this.previous = previous
      },

      // nextPost() {
      //     axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
      //     .then(({data}) => {
      //       this.next = data
      //     })
      // },

      // usingData() {
      //   const dataVar = this.test
      //   console.log('data Var', dataVar)
      // },

      previousPost() {

      }

    },
    computed: {

    },
    watch: {
      $route(to, from) {
        // this.getPost()
        this.getPostRefactor()
        // this.nextPost()
        // this.previousPost()
      }
    },
    created() {

      this.setUp()
      this.getPostRefactor()
      this.testnextPost(this.testAllPosts)
      // this.usingData()
      // this.previousPost()
      // this.testnextPost(this.allPosts)
      console.log('created',this.testJunk)

    },
    beforeCreate: function () {
      axios.get('http://vue-wp.test/wp-json/wp/v2/posts')
        .then(({data}) => {
          this.testJunk = data
        })

        console.log('beforeCreate',this.testJunk)

    },
    mounted () {
      console.log('mounted',this.testJunk)
    }

  }
</script>
