<template>
  <div id="blog-post">
    <h1 v-if="post.title">{{ post.title.rendered }}</h1>
    <!-- <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4> -->
    <div v-if="post.content" v-html="post.content.rendered"></div>

    <router-link v-if="previousPostData.title" :to="{name:'blog-post', params: { slug: previousPostData.slug }}" class="button previous">
      {{previousPostData.title.rendered}} | Previous Post
    </router-link>
    <router-link v-if="nextPostData.title" :to="{name:'blog-post', params: { slug: nextPostData.slug }}" class="button next">
      {{nextPostData.title.rendered}} | Next Post
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['slug'],
    name: 'blog-post',
    data() {
      return {
        post: {},
        next: {},
        previousPostData: {},
        nextPostData: {}
      }
    },
    methods: {
      getPost () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/posts',
        }).then(response => {
          const allPosts = response.data
          const singlePost = allPosts.find(single => single.slug === this.slug)
          this.post = singlePost
          const singlePostDate = this.post.date
          const previousPost = allPosts.find(d1 => d1.date < singlePostDate)
          this.previous = previousPost
          const nextPost = allPosts.find(d2 => d2.date > singlePostDate)
          if (typeof nextPost === 'undefined') {
            this.next = false
          } else {
            this.next = nextPost
          }

          if (nextPost) {
            const singlePostId = singlePost.id
            const postsArrayId = allPosts.sort(function (a, b) {
              return a.id - b.id;
            });
            const testResult = allPosts.map(a => a.id);
            function closestAbove(arr, closestTo){
              let closest = Math.max.apply(null, arr); //Get the highest number in arr in case it match nothing.
              for(var i = 0; i < arr.length; i++){ //Loop the array
                  if(arr[i] > closestTo && arr[i] < closest) closest = arr[i]; //Check if it's higher than your number, but lower than your closest value
              }
              return closest; // return the value
            }
            const closestAboveId = closestAbove(testResult, singlePostId);
            // function to find the next post id in the all posts array
            function findNextPost(thePost) {
              return thePost.id === closestAboveId
            }
            // the next post data variable
            const nextPostData = allPosts.find(findNextPost)
            this.nextPostData = nextPostData
          } else {
            const nextPostData = false
            this.nextPostData = nextPostData
          }

          if(previousPost) {
            const singlePostId = singlePost.id
            const postsArrayId = allPosts.sort(function (a, b) {
              return a.id - b.id;
            });
            const testResult = allPosts.map(a => a.id);
            // function to find the next id below the current post id
            function closestBelow(arr, closestTo){
              let closest = Math.max.apply(null, arr); //Get the highest number in arr in case it match nothing.
              for(var i = 0; i < arr.length; i++){ //Loop the array
                  if(arr[i] < closestTo) closest = arr[i]; //Check if it's higher than your number, but lower than your closest value
              }
              return closest; // return the value
            }
            const closestBelowId = closestBelow(testResult, singlePostId);
            // function to find the previous post id in the all posts array
            function findPreviousPost(thePost) {
              return thePost.id === closestBelowId
            }
            // the previous post data variable
            const previousPostData = allPosts.find(findPreviousPost)
            this.previousPostData = previousPostData
          } else {
            const previousPostData = false
            this.previousPostData = previousPostData
          }
        })
      }
    },
    watch: {
      $route(to, from) {
        this.getPost()
      }
    },
    created() {
      this.getPost()
    },
    beforeCreate: function () {

    }

  }
</script>
