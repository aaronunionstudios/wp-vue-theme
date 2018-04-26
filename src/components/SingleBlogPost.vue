<template>
  <div class="singleblogpost">
    <div class="blog-content">
      <div class="title" v-if="post.title">{{post.title.rendered}}</div>
      <div class="content" v-if="post.excerpt" v-html="post.excerpt.rendered"></div>
      <div class="button">
        <router-link v-if="post.slug" :to="{name:'blog-post', params: { slug: post.slug }}">
          Read More
        </router-link>
      </div>
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
        postFull: [],
        post:[],
        img:[]
      }
    },
    methods: {
      getPost () {
        axios({
          method: 'get',
          url: 'http://vue-wp.test/wp-json/wp/v2/posts',
        }).then(({data}) => {
          const allPosts = data
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

<style lang="scss" scoped>
@import '../assets/sass/variables';
.singleblogpost {
    position:relative;

    .blog-content {
      width: 50%;
      height: 50%;
      overflow: auto;
      margin: auto;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      z-index:100;

      .title {
        font-size:24px;
        display:block;
        width:100%;
        text-align:center;
        color:#fff;
      }
      .content {
        display:block;
        width:100%;
        color:#fff;
        text-align:center;
        padding:0 50px;
      }
      .button {
        text-align:center;

        a {
          display:inline-block;
          padding:5px 10px;
          background-color:$brand-green;
          margin:20px 0;
          color:#fff;
        }
      }
    }

    .featured-image {

      img {
        width:100%;
        height:100%;
        top: 0; left: 0; bottom: 0; right: 0;
        z-index:99;
      }
    }
  }
</style>

