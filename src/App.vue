<template>
  <div id="app">
    <header-app></header-app>
    <!-- <transition name="fade"> -->
      <div class="main">
        <router-view></router-view>
      </div>
    <!-- </transition> -->
    <footer-app></footer-app>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderApp from './components/Header'
import Home from './components/Home'
import FooterApp from './components/Footer'


Vue.filter('capitalize', function (value) {
  return value.charAt(0).toUpperCase() + value.substr(1)
})

export default {
  name: 'app',
  components: {
    HeaderApp,
    Home,
    FooterApp
  },
  data () {
    return {
      pages: [
        'stories',
        'register',
        'login'
      ],
      activePage: 'stories'
    }
  },
  methods: {
    setPage (newPage) {
      this.activePage = newPage
    },
    isActivePage (page) {
      return this.activePage === page
    }
  }
}
</script>
